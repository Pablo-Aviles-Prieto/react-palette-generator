import styles from './Palettes.module.css';
import PaletteList from './PaletteList';

const Palettes = (props) => {
  return (
    <section className={styles.palettes}>
      <div className={styles.head}>
        <h3>Saved palettes</h3>
      </div>
      <div className={styles['saved-palettes']}>
        <PaletteList
          onEditPalette={props.onEditPalette}
          onRemovePalette={props.onRemovePalette}
          savedPalettes={props.savedPalettes}
          paletteEditing={props.paletteEditing}
        />
      </div>
    </section>
  );
};

export default Palettes;
