import React, { useState } from 'react';
import Button from '../FormElements/Button';
import Modal from './Modal';

import Register from '../../auth/Register';

const Landing = props => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openModal = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showRegisterModal}
        onCancel={closeModal}
        header={props.address}
        contentClass="register-modal-content"
        footerClass="register-modal-content"
        footer={
          <button class="close-button topright" onClick={closeModal}>
            x
          </button>
        }
        className="modal-register"
      >
        <Register />
      </Modal>

      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Link Developer</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Button onClick={openModal} className="btn" modifier="primary">
                Sign Up
              </Button>
              <Button to="/login" className="btn" modifier="light">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Landing;
