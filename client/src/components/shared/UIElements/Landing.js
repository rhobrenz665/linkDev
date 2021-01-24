import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../FormElements/Button';
import Modal from './Modal';

import Register from '../../auth/Register';

const Landing = ({ isAuthenticated, address }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openModal = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
  };
  return (
    <React.Fragment>
      {isAuthenticated && <Redirect to="/dashboard" />}
      <Modal
        show={showRegisterModal}
        onCancel={closeModal}
        header={address}
        contentClass="register-modal-content"
        footerClass="register-modal-content"
        footer={
          <button className="close-button topright" onClick={closeModal}>
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
              <Button
                onClick={openModal}
                className="btn"
                modifier="primary"
                to="/register"
              >
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

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
