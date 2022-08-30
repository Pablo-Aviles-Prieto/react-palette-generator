import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { SavedPalettesContext } from './savedPalettes-context.js';

const getLocalStorage = () => {
  const savedPalettes = localStorage.getItem('paletteColors');
  const palettes = JSON.parse(savedPalettes);

  return palettes ? palettes : [];
};

const saveLocalStorage = (data) => {
  localStorage.setItem('paletteColors', JSON.stringify(data));
};

export const SavedPaletteProvider = (props) => {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [paletteEditing, setPaletteEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSavedPalettes(getLocalStorage());
  }, [setSavedPalettes]);

  const removeSavedPaletteHandler = (id) => {
    setSavedPalettes((prevState) => {
      const newState = prevState.filter((palette) => palette.id !== id);
      saveLocalStorage(newState);
      return newState;
    });
  };

  const saveLocalStorageHandler = useCallback(
    (data) => {
      setSavedPalettes((prevState) => {
        if (paletteEditing) {
          const newEditedPalettes = prevState.map((palette) => {
            if (palette.id === paletteEditing.id) {
              return { ...palette, title: data.title, colors: data.colors };
            }
            return palette;
          });
          saveLocalStorage(newEditedPalettes);
          return newEditedPalettes;
        }
        const newStoredPalettes = [...prevState, data];
        saveLocalStorage(newStoredPalettes);
        return newStoredPalettes;
      });
      setPaletteEditing(false);
    },
    [paletteEditing]
  );

  const editSavedPaletteHandler = (palette) => {
    setPaletteEditing((prevState) => {
      if (prevState.id === palette.id) {
        navigate('/');
        return prevState ? false : palette;
      }
      return palette;
    });
  };

  const paletteContext = {
    savedPalettes,
    paletteEditing,
    removeSavedPalette: removeSavedPaletteHandler,
    editSavedPalette: editSavedPaletteHandler,
    saveLocalStorage: saveLocalStorageHandler,
  };

  return (
    <SavedPalettesContext.Provider value={paletteContext}>
      {props.children}
    </SavedPalettesContext.Provider>
  );
};
