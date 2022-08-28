import Palettes from './Palettes';
import NoPalettes from './NoPalettes';
import { useOutletContext } from 'react-router-dom';

const SavedPalettes = () => {
  const [savedPalettes, paletteEditing, onEditPalette, onRemovePalette] =
    useOutletContext();

  return (
    <>
      {savedPalettes.length > 0 ? (
        <Palettes
          onRemovePalette={onRemovePalette}
          savedPalettes={savedPalettes}
          onEditPalette={onEditPalette}
          paletteEditing={paletteEditing}
        />
      ) : (
        <NoPalettes />
      )}
    </>
  );
};

export default SavedPalettes;
