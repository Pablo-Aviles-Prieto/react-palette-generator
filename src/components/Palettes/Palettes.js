import styles from './Palettes.module.css';
import PaletteList from './PaletteList';

const Palettes = () => {
  return (
    <section className={styles.palettes}>
      <div className={styles.head}>
        <h3>Saved palettes</h3>
      </div>
      <div className={styles['saved-palettes']}>
        <PaletteList />
      </div>
    </section>
  );
};

export default Palettes;
