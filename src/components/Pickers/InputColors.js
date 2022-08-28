import { useRef, useEffect } from 'react';

import styles from './InputColors.module.css';
import { Plus } from '../Icons/index.js';

const InputColors = ({ onSubmit, hasError, paletteEditing }) => {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(inputRef);
  };

  useEffect(() => {
    if (paletteEditing) {
      inputRef.current.value = paletteEditing.title;
    } else {
      inputRef.current.value = '';
    }
  }, [paletteEditing]);

  return (
    <form onSubmit={submitHandler} className={styles['save-input']}>
      <label>Name</label>
      <div>
        <input
          ref={inputRef}
          style={{ borderColor: hasError ? 'red' : 'white' }}
        />
        <button>
          <Plus width={30} />
        </button>
      </div>
    </form>
  );
};

export default InputColors;
