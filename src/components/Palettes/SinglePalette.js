import { useCallback, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SinglePalette.module.css';
import { Trash, Copy, Copied } from '../Icons';
import { SavedPalettesContext } from '../../store/savedPalettes-context.js';
import { toast } from 'wc-toast';

let copyPaletteTimeout;

const SinglePalette = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const { paletteEditing, removeSavedPalette, editSavedPalette } =
    useContext(SavedPalettesContext);

  useEffect(() => {
    if (isCopied) {
      copyPaletteTimeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(copyPaletteTimeout);
  }, [isCopied]);

  const { id: idPaletteEditing } = paletteEditing;
  const { id: idPalette } = props;
  const isEditing = idPaletteEditing === idPalette;

  const classes = useCallback(() => {
    if (isEditing) {
      return `${styles.card} ${styles['card-active']}`;
    }
    return `${styles.card}`;
  }, [isEditing]);

  const copyPaletteHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('URL Copied!', {
      icon: {
        type: 'success',
      },
      duration: 2000,
    });
    setIsCopied(true);
  };

  const editPaletteHandler = () => {
    const paramColors = props.palette.colors.map((paletteCircle) => {
      const hexColorSliced = paletteCircle.color.slice(1);
      return hexColorSliced;
    });
    navigate(
      `/?1=${paramColors[0]}&2=${paramColors[1]}&3=${paramColors[2]}&4=${paramColors[3]}&5=${paramColors[4]}`
    );
    editSavedPalette(props.palette);
  };

  return (
    <>
      <wc-toast></wc-toast>
      <div className={classes()}>
        <div className={styles.title}>
          <p>{props.palette.title}</p>
          <div>
            {!isEditing ? (
              <Trash
                style={{ cursor: 'pointer' }}
                onClick={() => removeSavedPalette(props.palette.id)}
                width={21}
              />
            ) : !isCopied ? (
              <Copy
                style={{ cursor: 'pointer' }}
                onClick={copyPaletteHandler}
                width={21}
              />
            ) : (
              <Copied width={21} />
            )}
          </div>
        </div>
        <div onClick={editPaletteHandler} className={styles['circles-section']}>
          {props.palette.colors.map((circle) => (
            <div
              className={styles.circle}
              style={{ backgroundColor: circle.color }}
              key={circle.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SinglePalette;
