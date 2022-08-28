import { Link } from 'react-router-dom';

import styles from './Palettes.module.css';
import classes from './NoPalettes.module.css';
import btnStyles from '../../ButtonHelper.module.css';
import { Help } from '../Icons/index';

const NoPalettes = () => {
  return (
    <section className={styles.palettes}>
      <div className={styles.head}>
        <h2>Couldn't find any saved palette!</h2>
        <div className={classes.instructions}>
          <Help width={40} />
          Do you need some help? Learn how to manage your palettes
          <Link
            className={`${btnStyles['button-1']} ${btnStyles.button}`}
            to='/help'
          >
            How to...
            <Help className={btnStyles['arrow-hover']} width='25' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoPalettes;
