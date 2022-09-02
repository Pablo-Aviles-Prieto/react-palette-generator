import { useContext, useState } from 'react';

import InputColors from './InputColors';
import styles from './ColorPicker.module.css';
import CircleColorList from './CircleColorList';
import { PaletteContext } from '../../store/palette-context';
import renderSelectedPickerComponent from './renderSelectedPickerComponent';
import DropDownOptions from '../Layout/DropDownOptions';

const pickerSelectors = [
  {
    label: 'Slide Picker',
  },
  {
    label: 'Circle Picker',
  },
  {
    label: 'Compact Picker',
  },
  {
    label: 'Full Picker',
  },
];

const ColorPicker = () => {
  const [optionSelected, setOptionSelected] = useState('Compact Picker');
  const { paletteColor, changeCircleColor } = useContext(PaletteContext);

  const changeColorHandler = (color) => {
    changeCircleColor(color);
  };

  const onChangeOptionHandler = (e) => {
    setOptionSelected(e.target.childNodes[0].data);
  };

  return (
    <>
      <div className={styles['picked-colors']}>
        <CircleColorList />
      </div>
      <DropDownOptions
        dropDownTitle='Change picker'
        optionsDropDown={pickerSelectors}
        onChangeOptionHandler={onChangeOptionHandler}
        selectedPicker={optionSelected}
      />
      <div className={styles['picker-section']}>
        {optionSelected &&
          renderSelectedPickerComponent(
            optionSelected,
            paletteColor,
            changeColorHandler
          )}
        <div>
          <InputColors />
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
