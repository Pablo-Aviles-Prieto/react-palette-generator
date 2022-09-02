import { useCallback, useState } from 'react';

import styles from './DropDownOptions.module.css';
import ModalBackdrop from '../UI/ModalBackdrop';
import renderSelectedPickerComponent from '../Pickers/renderSelectedPickerComponent';
import { useScreenWidth } from 'utils';
import { Close, UpperArrow } from 'components/Icons';

const DropDownOptions = ({
  dropDownTitle,
  optionsDropDown,
  onChangeOptionHandler,
  selectedPicker,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewedPicker, setPreviewedPicker] = useState(false);

  const isMobile = useScreenWidth(870);

  const toggleModalBackdropHandler = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const openOptionsClass = !isOpen
    ? `${styles['hidden-class']} ${styles['drop-down-option']}`
    : `${styles['drop-down-option']} ${styles['drop-down-option-active']}`;

  const hideDropDownOnModal = !isOpen
    ? `${styles['drop-down-card']} ${styles['drop-down-card-closed']}`
    : isMobile
    ? styles['hidden-class']
    : `${styles['drop-down-card']} ${styles['drop-down-card-active']}`;

  const pickerListRender = (
    ulStyle,
    liStyle,
    onMouseHoverModal = undefined,
    onMouseLeaveModal = undefined
  ) => {
    return (
      <ul className={ulStyle}>
        {optionsDropDown.map((option) => {
          console.log('option.label', option.label);
          return selectedPicker === option.label ? (
            <li
              className={liStyle}
              key={option.label}
              onClick={changePickerWhileResetModal}
              onMouseOver={onMouseHoverModal}
              onMouseLeave={onMouseLeaveModal}
            >
              {option.label}
            </li>
          ) : (
            <li
              key={option.label}
              onClick={changePickerWhileResetModal}
              onMouseOver={onMouseHoverModal}
              onMouseLeave={onMouseLeaveModal}
            >
              {option.label}
            </li>
          );
        })}
        {!isMobile && (
          <UpperArrow
            onClick={toggleModalBackdropHandler}
            color='#8a61e9'
            width={35}
          />
        )}
      </ul>
    );
  };

  const onPickerHoverPreviewHandler = (e) => {
    const pickerOptionHovered = e.target.childNodes[0].data;

    setPreviewedPicker(pickerOptionHovered);
  };

  const onPickerMouseLeaveHandler = () => {
    setPreviewedPicker(false);
  };

  const changePickerWhileResetModal = (e) => {
    onChangeOptionHandler(e);
    setPreviewedPicker(false);
    setIsOpen(false);
  };

  return (
    <>
      {isMobile && isOpen && (
        <ModalBackdrop onClose={toggleModalBackdropHandler}>
          <div>
            <div
              style={{ position: 'relative', cursor: 'unset' }}
              className={`${styles['drop-down-title']} ${styles.selected}`}
            >
              <div>{dropDownTitle}</div>
              <Close
                onClick={toggleModalBackdropHandler}
                className={styles['drop-down-close-x']}
              />
            </div>
            {pickerListRender(
              openOptionsClass,
              styles['selected-picker-modal'],
              onPickerHoverPreviewHandler,
              onPickerMouseLeaveHandler
            )}
          </div>
          {previewedPicker && (
            <div className={styles['preview-picker-modal']}>
              {renderSelectedPickerComponent(
                previewedPicker,
                '#8a61e9',
                undefined,
                undefined
              )}
            </div>
          )}
        </ModalBackdrop>
      )}
      <div>
        <div className={hideDropDownOnModal}>
          <div
            className={
              !isOpen
                ? `${styles['drop-down-title']}`
                : `${styles['drop-down-title']} ${styles.selected}`
            }
            onClick={toggleModalBackdropHandler}
          >
            {dropDownTitle}
          </div>
          {!isMobile &&
            pickerListRender(openOptionsClass, styles['selected-picker'])}
        </div>
      </div>
    </>
  );
};

export default DropDownOptions;
