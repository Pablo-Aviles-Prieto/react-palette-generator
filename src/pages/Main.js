import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import ColorPicker from '../components/Pickers/ColorPicker';

const getLocalStorage = () => {
  const savedPalettes = localStorage.getItem('paletteColors');
  const palettes = JSON.parse(savedPalettes);

  return palettes ? palettes : [];
};

const saveLocalStorage = (data) => {
  localStorage.setItem('paletteColors', JSON.stringify(data));
};

const Main = () => {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [paletteEditing, setPaletteEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSavedPalettes(getLocalStorage());
  }, [setSavedPalettes]);

  const onRemovePalette = (id) => {
    setSavedPalettes((prevState) => {
      const newState = prevState.filter((palette) => palette.id !== id);
      saveLocalStorage(newState);
      return newState;
    });
  };

  const onSavePalette = (data) => {
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
  };

  const onEditPalette = (palette) => {
    setPaletteEditing((prevState) => {
      if (prevState.id === palette.id) {
        navigate('/');
        return prevState ? false : palette;
      }
      return palette;
    });
  };

  return (
    <>
      <ColorPicker
        paletteEditing={paletteEditing}
        onSavePalette={onSavePalette}
      />
      <Outlet
        context={[
          savedPalettes,
          paletteEditing,
          onEditPalette,
          onRemovePalette,
        ]}
      />
    </>
  );
};

export default Main;
