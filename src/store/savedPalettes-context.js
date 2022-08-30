import { createContext } from 'react';

export const SavedPalettesContext = createContext({
  savedPalettes: [],
  paletteEditing: false,
  removeSavedPalette: (id) => {},
  saveLocalStorage: (data) => {},
  editSavedPalette: (paletteObj) => {},
});
