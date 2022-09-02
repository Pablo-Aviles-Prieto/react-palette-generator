import {
  AlphaPicker,
  CirclePicker,
  CompactPicker,
  HuePicker,
  SketchPicker,
} from 'react-color';

const renderSelectedPickerComponent = (
  optionSelected,
  paletteColor,
  changeColorHandler
) => {
  switch (optionSelected) {
    case 'Slide Picker':
      return (
        <div className='slide-picker'>
          <HuePicker
            width={270}
            color={paletteColor}
            onChange={changeColorHandler}
          />
          <AlphaPicker
            width={270}
            color={paletteColor}
            onChange={changeColorHandler}
          />
        </div>
      );
    case 'Circle Picker':
      return (
        <CirclePicker color={paletteColor} onChange={changeColorHandler} />
      );
    case 'Compact Picker':
      return (
        <CompactPicker color={paletteColor} onChange={changeColorHandler} />
      );
    case 'Full Picker':
      return (
        <SketchPicker color={paletteColor} onChange={changeColorHandler} />
      );
    default:
      return;
  }
};

export default renderSelectedPickerComponent;
