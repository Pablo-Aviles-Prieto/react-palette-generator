import SinglePalette from './SinglePalette';

const PaletteList = ({ savedPalettes, onRemovePalette, onEditPalette, paletteEditing }) => {
  return (
    <>
      {savedPalettes.map((palette) => (
        <SinglePalette
          onEditPalette={onEditPalette}
          onRemovePalette={onRemovePalette}
          palette={palette}
          key={palette.id}
          id={palette.id}
          paletteEditing={paletteEditing}
        />
      ))}
    </>
  );
};

export default PaletteList;
