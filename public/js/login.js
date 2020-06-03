import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    // console.log('res', res);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (
  name,
  email,
  phoneNumber,
  password,
  passwordConfirm
) => {
  if (!password === passwordConfirm)
    return showAlert('error', 'Passwords do not match');
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        phoneNumber,
        password,
        passwordConfirm,
      },
    });
    // console.log('res', res);
    if (res.data.status === 'success') {
      showAlert('success', 'Your Account successfully Registered');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
