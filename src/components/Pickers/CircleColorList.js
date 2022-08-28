import CircleColor from './CircleColor';

const CircleColorList = (props) => {
  return (
    <>
      {props.state.map((circle) => {
        return (
          <CircleColor
            key={circle.id}
            id={circle.id}
            bg={circle.color}
            selected={circle.isSelected}
            onClicked={props.onClicked}
            hasError={circle.hasError}
          />
        );
      })}
    </>
  );
};
export default CircleColorList;
