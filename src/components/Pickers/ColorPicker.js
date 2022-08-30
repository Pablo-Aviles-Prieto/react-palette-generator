import { CompactPicker } from 'react-color';
import { useContext } from 'react';

import InputColors from './InputColors';
import styles from './ColorPicker.module.css';
import CircleColorList from './CircleColorList';
import { PaletteContext } from '../../store/palette-context.js';

const ColorPicker = () => {
  const { paletteColor, changeCircleColor } = useContext(PaletteContext);

  const changeColorHandler = (color) => {
    changeCircleColor(color);
  };

  return (
    <>
      <div className={styles['picked-colors']}>
        <CircleColorList />
      </div>
      <div className={styles['picker-section']}>
        <CompactPicker color={paletteColor} onChange={changeColorHandler} />
        <div>
          <InputColors />
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
