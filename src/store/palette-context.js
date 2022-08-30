import { createContext } from 'react';

export const INITIAL_STATE = [
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

export const PaletteContext = createContext({
  colorPicked: INITIAL_STATE,
  paletteColor: '#fff',
  inputError: false,
  changeCircleColor: (color) => {},
  setCircleFocus: (id) => {},
  editPalette: (paletteEditing) => {},
  setNewPalette: () => {},
  toggleCircleError: () => {},
  changeInputErrorState: (newState) => {},
});
