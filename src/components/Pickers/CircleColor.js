import { useContext, useCallback } from 'react';

import { Plus } from '../Icons';
import styles from './CircleColor.module.css';
import { PaletteContext } from '../../store/palette-context.js';

const CircleColor = (props) => {
  const { setCircleFocus } = useContext(PaletteContext);

  const { id } = props;

  const clickHandler = useCallback(() => {
    setCircleFocus(id);
  }, [setCircleFocus, id]);

  const classes = props.selected
    ? `${styles.circle} ${styles['circle-active']}`
    : props.bg
    ? styles.circle
    : `${styles.circle} ${styles['circle-empty']}`;

  return (
    <div
      onClick={clickHandler}
      style={{
        backgroundColor: props.bg ? props.bg : '',
        borderColor: props.hasError ? 'red' : 'white',
      }}
      className={classes}
    >
      {!props.bg && <Plus />}
    </div>
  );
};

export default CircleColor;
