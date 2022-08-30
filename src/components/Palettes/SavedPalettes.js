import { useContext } from 'react';

import Palettes from './Palettes';
import NoPalettes from './NoPalettes';
import { SavedPalettesContext } from '../../store/savedPalettes-context';

const SavedPalettes = () => {
  const { savedPalettes } = useContext(SavedPalettesContext);

  return savedPalettes.length > 0 ? <Palettes /> : <NoPalettes />;
};

export default SavedPalettes;
