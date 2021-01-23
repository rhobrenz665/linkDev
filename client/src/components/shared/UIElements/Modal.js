import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Alert from './Alert';
import Backdrop from './Backdrop';

const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal-header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <div>
        <div className={`modal-content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal-footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
