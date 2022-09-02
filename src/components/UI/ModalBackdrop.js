import { createPortal } from 'react-dom';

import classes from './ModalBackdrop.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const ModalBackdrop = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {createPortal(<Modal>{props.children}</Modal>, portalElement)}
    </>
  );
};

export default ModalBackdrop;
