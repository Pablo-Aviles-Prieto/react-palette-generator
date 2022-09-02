import { v4 as uuidv4 } from 'uuid';
import { useRef, useEffect, useContext } from 'react';

import styles from './InputColors.module.css';
import { Plus } from '../Icons/index.js';
import { PaletteContext } from '../../store/palette-context';
import { SavedPalettesContext } from '../../store/savedPalettes-context';

const InputColors = () => {
  const inputRef = useRef();
  const {
    colorPicked,
    inputError,
    changeInputErrorState,
    setNewPalette,
    toggleCircleError,
  } = useContext(PaletteContext);

  const { paletteEditing, saveLocalStorage } = useContext(SavedPalettesContext);

  useEffect(() => {
    if (paletteEditing) {
      inputRef.current.value = paletteEditing.title;
    } else {
      inputRef.current.value = '';
    }
  }, [paletteEditing]);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = inputRef.current.value.trim();

    const emptyCircles = colorPicked.filter((circle) => !circle.color);

    if (emptyCircles.length > 0 || !enteredName) {
      toggleCircleError();

      if (!enteredName) {
        return changeInputErrorState(true);
      }

      return changeInputErrorState(false);
    }

    const circleColors = colorPicked.map((circle) => ({
      id: circle.id,
      color: circle.color,
    }));
    const newPalette = {
      id: uuidv4(),
      title: enteredName,
      colors: circleColors,
    };

    saveLocalStorage(newPalette);
    setNewPalette();
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={submitHandler} className={styles['save-input']}>
      <div className={styles['form-control']}>
        <label>Name</label>
        <div className={styles['input-btn']}>
          <input
            ref={inputRef}
            style={{ borderColor: inputError ? 'red' : 'white' }}
          />
          <button>
            <Plus width={30} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputColors;
