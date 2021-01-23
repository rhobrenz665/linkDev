import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get(`${process.env.REACT_APP_BACKEND_URL}/users/`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/register`,
      formData
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    for (let error in errors) {
      dispatch(setAlert(errors[error], 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      body
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    for (let error in errors) {
      dispatch(setAlert(errors[error], 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
