import api from '../utils/api';
import { setAlert } from '../actions/alert';

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await api.get(`${process.env.REACT_APP_BACKEND_URL}/profile`);

    dispatch({ type: GET_PROFILE, payload: res.data });
    console.log(res);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        payload: err,
      },
    });

    const errors = err.response.data;
    for (let error in errors) {
      dispatch(setAlert(errors[error], 'danger'));
    }
  }
};

// Create or update profile
export const createProfile = (formData, history, edit) => async dispatch => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_BACKEND_URL}/profile`,
      formData
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    const errors = err.response.data;
    for (let error in errors) {
      dispatch(setAlert(errors[error], 'danger'));
    }
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await api.put(
      `${process.env.REACT_APP_BACKEND_URL}/profile/education`,
      formData
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data;

    for (let error in errors) {
      dispatch(setAlert(errors[error], 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_BACKEND_URL}/profile/education/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
