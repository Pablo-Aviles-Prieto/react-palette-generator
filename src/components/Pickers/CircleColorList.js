import { useContext } from 'react';

import CircleColor from './CircleColor';
import { PaletteContext } from '../../store/palette-context';

const CircleColorList = () => {
  const { colorPicked } = useContext(PaletteContext);

  return (
    <>
      {colorPicked.map((circle) => {
        return (
          <CircleColor
            key={circle.id}
            id={circle.id}
            bg={circle.color}
            selected={circle.isSelected}
            hasError={circle.hasError}
          />
        );
      })}
    </>
  );
};
export default CircleColorList;
