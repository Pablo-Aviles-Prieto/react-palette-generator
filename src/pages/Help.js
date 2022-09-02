import { Link } from 'react-router-dom';

import styles from './Help.module.css';
import classes from '../ButtonHelper.module.css';
import PaletteExample from '../components/Palettes/PaletteExample';
import DropDownExample from '../components/Layout/DropDownExample';
import { Plus, Trash, Copy, Pencil } from '../components/Icons/index.js';

const Help = () => {
  return (
    <section className={styles.palettes}>
      <div className={styles.head}>
        <h1>How to create palettes and play around with them!</h1>
        <div className={styles.instructions}>
          <div>
            - You need to choose a circle and pick a color for it.{' '}
            <i>*By defult the color white is the selected one</i>
          </div>
          <div>
            - You can select/deselect a circle clicking on it to add/modify the
            color{' '}
            <div className={`${styles.circle} ${styles['circle-empty']}`}>
              <Plus />
            </div>
          </div>
          <div>
            - You can choose between different pickers with different options to
            play with <DropDownExample />
          </div>
          <div>
            - When all the circles are filled, you have to chose a name for the
            palette in order to save it, clicking in the icon{'  '}
            <button className={styles['example-add-button']}>
              <Plus width={25} />
            </button>
          </div>
          <div>
            - You can edit a saved palette by clicking on them{' '}
            <PaletteExample className={styles['get-gapped']} />
          </div>
          <div>
            - While edditting a palette, you can also copy the URL of the active
            one and share it by clicking on <Copy width={25} />
          </div>
          <div>
            - Last, you can delete any palette saved by clicking on{' '}
            <Trash width={25} />
          </div>
          <div className={styles['back-start']}>
            <h3>Ready to create some amazing combinations?</h3>{' '}
            <Link className={`${classes['button-1']} ${classes.button}`} to='/'>
              Let's Go!
              <Pencil
                className={classes['arrow-hover']}
                width='25'
                height='25'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
