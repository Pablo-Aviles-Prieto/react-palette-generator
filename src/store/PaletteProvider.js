import {
  useReducer,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { PaletteContext, INITIAL_STATE } from './palette-context';
import { SavedPalettesContext } from './savedPalettes-context';

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'FOCUS': {
      const newState = state.map((circle) => {
        if (circle.isSelected && circle.id !== action.id) {
          circle.isSelected = false;
        }
        if (circle.id === action.id) {
          if (circle.color) {
            action.setPaletteColor(circle.color);
            return {
              ...circle,
              isSelected: !circle.isSelected,
            };
          }
          return {
            ...circle,
            color: action.paletteColor,
            isSelected: !circle.isSelected,
          };
        }
        return circle;
      });
      return newState;
    }
    case 'COLOR': {
      const newState = state.map((circle) => {
        if (circle.isSelected) {
          return {
            ...circle,
            color: action.colorRGB,
          };
        }
        return circle;
      });
      return newState;
    }
    case 'ERROR': {
      const newState = state.map((circle) => {
        if (!circle.color) {
          return { ...circle, hasError: true };
        } else {
          return { ...circle, hasError: false };
        }
      });
      return newState;
    }
    case 'EDIT': {
      const newPalette = state.map((circle) => {
        const singleCircleColor = action.palette.colors.filter((color) => {
          return color.id === circle.id;
        });
        const [circleColor] = singleCircleColor;
        return { ...circle, hasError: false, color: circleColor.color };
      });
      return newPalette;
    }
    case 'PARAMS': {
      if (action.palette.length < 5) {
        return state;
      }

      const newState = state.map((circle) => {
        const matchCircle = action.palette.find((paletteCircle) => {
          return +paletteCircle.key === circle.id;
        });

        if (!matchCircle) {
          return circle;
        }

        const newRGBColorFromParams = `rgba(${matchCircle.color[0]}, ${matchCircle.color[1]}, ${matchCircle.color[2]}, ${matchCircle.color[3]})`;
        return { ...circle, color: newRGBColorFromParams };
      });
      return newState;
    }
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};

let initial = true;

export const PaletteProvider = (props) => {
  const [inputError, setInputError] = useState(false);
  const [paletteColor, setPaletteColor] = useState('rgba(255, 255, 255, 1)');
  const [colorPicked, dispatchColorPicked] = useReducer(
    colorReducer,
    INITIAL_STATE
  );

  const { paletteEditing } = useContext(SavedPalettesContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (paletteEditing) {
      dispatchColorPicked({ type: 'EDIT', palette: paletteEditing });
      setInputError(false);
    } else if (!paletteEditing && !initial) {
      dispatchColorPicked({ type: 'RESET' });
      setInputError(false);
    }
  }, [paletteEditing, dispatchColorPicked, setInputError]);

  useEffect(() => {
    if (initial) {
      const params = [];
      searchParams.forEach((value, key) => {
        const valueArray = value.split(',');
        params.push({ key, color: valueArray });
      });

      dispatchColorPicked({ type: 'PARAMS', palette: params });

      initial = false;
    }
  }, [searchParams, dispatchColorPicked]);

  const changeColorHandler = useCallback(
    (color) => {
      const newRGB = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
      setPaletteColor(newRGB);
      dispatchColorPicked({
        type: 'COLOR',
        colorRGB: newRGB,
      });
    },
    [setPaletteColor, dispatchColorPicked]
  );

  const setCircleFocusHandler = useCallback(
    (id) => {
      dispatchColorPicked({
        type: 'FOCUS',
        id: +id,
        paletteColor,
        setPaletteColor,
      });
    },
    [paletteColor, dispatchColorPicked]
  );

  const editPaletteHandler = useCallback(
    (paletteEditing) => {
      dispatchColorPicked({ type: 'EDIT', palette: paletteEditing });
    },
    [dispatchColorPicked]
  );

  const toggleCircleErrorHandler = useCallback(() => {
    dispatchColorPicked({ type: 'ERROR' });
  }, [dispatchColorPicked]);

  const changeInputErrorStateHandler = useCallback(
    (newState) => {
      setInputError(newState);
    },
    [setInputError]
  );

  const setNewPaletteHandler = () => {
    setInputError(false);
    dispatchColorPicked({ type: 'RESET' });
    navigate('/');
  };

  const paletteContext = {
    colorPicked,
    paletteColor,
    inputError,
    changeCircleColor: changeColorHandler,
    setCircleFocus: setCircleFocusHandler,
    editPalette: editPaletteHandler,
    setNewPalette: setNewPaletteHandler,
    toggleCircleError: toggleCircleErrorHandler,
    changeInputErrorState: changeInputErrorStateHandler,
  };

  return (
    <PaletteContext.Provider value={paletteContext}>
      {props.children}
    </PaletteContext.Provider>
  );
};
