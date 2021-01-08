import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = () => {
    console.log(124124);
  };
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles" className="tooltip round-background">
          <i className="fas fa-users"></i>
          <span className="tooltiptext">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register" className="tooltip round-background">
          <i className="fas fa-user-plus"></i>
          <span className="tooltiptext">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login" className="tooltip round-background">
          <i className="fas fa-sign-in-alt"></i>
          <span className="tooltiptext">Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> LinkDev
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// // const mapStateToProps = state => ({
// //   auth: state.auth,
// // });

export default Navbar;
