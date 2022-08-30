import SinglePalette from './SinglePalette';
import { useContext } from 'react';
import { SavedPalettesContext } from '../../store/savedPalettes-context';

const PaletteList = () => {
  const { savedPalettes } = useContext(SavedPalettesContext);

  return (
    <>
      {savedPalettes.map((palette) => {
        return (
          <SinglePalette key={palette.id} id={palette.id} palette={palette} />
        );
      })}
    </>
  );
};

export default PaletteList;
