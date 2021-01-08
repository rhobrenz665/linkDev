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

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
