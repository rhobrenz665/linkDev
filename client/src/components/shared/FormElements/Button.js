import React from 'react';
import { Link } from 'react-router-dom';

const Button = props => {
  if (props.href) {
    return (
      <a className={`btn btn-${props.modifier}`} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`btn btn-${props.modifier}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`btn btn-${props.modifier}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ padding: '0.65rem 1.3rem' }}
    >
      {props.children}
    </button>
  );
};

export default Button;
