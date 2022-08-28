import { v4 as uuidv4 } from 'uuid';
import { CompactPicker } from 'react-color';
import { useReducer, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import InputColors from './InputColors';
import styles from './ColorPicker.module.css';
import CircleColorList from './CircleColorList';

const INITIAL_STATE = [
  {
    id: 1,
    color: '',
    isSelected: false,
    hasError: false,
  },
  {
    id: 2,
    color: '',
    isSelected: false,
    hasError: false,
  },
  {
    id: 3,
    color: '',
    isSelected: false,
    hasError: false,
  },
  {
    id: 4,
    color: '',
    isSelected: false,
    hasError: false,
  },
  {
    id: 5,
    color: '',
    isSelected: false,
    hasError: false,
  },
];

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
          return { ...circle, color: action.color };
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
        const matchCircle = action.palette.find(
          (paletteCircle) => +paletteCircle.key === circle.id
        );
        return { ...circle, color: `#${matchCircle.value}` };
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

const ColorPicker = ({ onSavePalette, paletteEditing }) => {
  const [paletteColor, setPaletteColor] = useState('#fff');
  const [inputError, setInputError] = useState(false);
  const [colorPicked, dispatchColorPicked] = useReducer(
    colorReducer,
    INITIAL_STATE
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (paletteEditing) {
      dispatchColorPicked({ type: 'EDIT', palette: paletteEditing });
      setInputError(false);
    } else if (!paletteEditing && !initial) {
      dispatchColorPicked({ type: 'RESET' });
      setInputError(false);
    }
  }, [paletteEditing]);

  useEffect(() => {
    if (initial) {
      const params = [];
      searchParams.forEach((value, key) => {
        params.push({ key, value });
      });

      dispatchColorPicked({ type: 'PARAMS', palette: params });

      initial = false;
    }
  });

  const changeColorHandler = (color, event) => {
    setPaletteColor(color.hex);
    dispatchColorPicked({ type: 'COLOR', color: color.hex });
  };

  const onClickedHandler = (id) => {
    dispatchColorPicked({
      type: 'FOCUS',
      id: +id,
      paletteColor,
      setPaletteColor,
    });
  };

  const onSbumitHandler = (inputRef) => {
    const enteredName = inputRef.current.value.trim();

    const emptyCircles = colorPicked.filter((circle) => !circle.color);

    if (emptyCircles.length > 0 || !enteredName) {
      dispatchColorPicked({ type: 'ERROR' });

      if (!enteredName) {
        return setInputError(true);
      }

      return setInputError(false);
    }

    const circleColors = colorPicked.map((circle) => ({
      id: circle.id,
      color: circle.color,
    }));
    const newPalette = {
      id: uuidv4(),
      title: enteredName,
      colors: circleColors,
    };

    onSavePalette(newPalette);

    inputRef.current.value = '';
    setInputError(false);
    dispatchColorPicked({ type: 'RESET' });
  };

  return (
    <>
      <div className={styles['picked-colors']}>
        <CircleColorList state={colorPicked} onClicked={onClickedHandler} />
      </div>
      <div className={styles['picker-section']}>
        <CompactPicker color={paletteColor} onChange={changeColorHandler} />
        <div>
          <InputColors
            paletteEditing={paletteEditing}
            hasError={inputError}
            onSubmit={onSbumitHandler}
          />
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
