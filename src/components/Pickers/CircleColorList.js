import { useContext } from 'react';

import CircleColor from './CircleColor';
import { PaletteContext } from '../../store/palette-context';

const CircleColorList = () => {
  const { colorPicked } = useContext(PaletteContext);

  const checkingForParamErrors = (circle) => {
    return (
      <CircleColor
        key={circle.id}
        id={circle.id}
        bg={circle.color}
        selected={circle.isSelected}
        hasError={circle.hasError}
      />
    );
  };

  return <>{colorPicked.map((circle) => checkingForParamErrors(circle))}</>;
};
export default CircleColorList;
