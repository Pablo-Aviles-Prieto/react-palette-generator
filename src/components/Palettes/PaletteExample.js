import styles from './PaletteExample.module.css';

const PaletteExample = () => {
  return (
    <div className={styles['circles-section']}>
      <div className={styles.circle} style={{ backgroundColor: '#A4DD00' }} />
      <div className={styles.circle} style={{ backgroundColor: '#68CCCA' }} />
      <div className={styles.circle} style={{ backgroundColor: '#73D8FF' }} />
      <div className={styles.circle} style={{ backgroundColor: '#AEA1FF' }} />
      <div className={styles.circle} style={{ backgroundColor: '#7B64FF' }} />
    </div>
  );
};

export default PaletteExample;
