import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { push } from 'react-router-redux'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const UNAUTHORIZED = 'Wrong email or password';
const WRONG_FIELD = 'Please check ';
const SERVER_ERROR = 'Server error occurred';

export function loginSuccess(access_token) {
  localStorage.setItem('access_token', access_token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      access_token: access_token
    }
  }
}

export function loginFailure(error) {
  localStorage.removeItem('access_token');
  let message = '';

  console.log(error.response);

  if (!!error.response.status) {
    // set failure message
    switch(error.response.status){
      case 401:
        message = UNAUTHORIZED;
        break;
      case 400:
        message = WRONG_FIELD + error.response.data.validation.keys[0];
        break;
      case 403:
        console.err(error.response);
        break;
      case 500:
        console.log(error.response);
        break;
    }
  }

  return {
    type: LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      message: message
    }
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  return {
    type: LOGOUT
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  }
}

export function login(email, password, redirect = "/dashboard", hashedPass = false) {
  return function(dispatch) {
    dispatch(loginRequest());

    // make post request
    axios.post('http://localhost:3000/token/', {
      email: email,
      password: password,
      hashed: hashedPass
    })
    .then((response) => {
      try {
        dispatch(loginSuccess(response.data.access_token));
        dispatch(push(redirect)); // TODO state doesn't save on push
      } catch (err) {
        dispatch(loginFailure({
          response: {
            status: 403,
            message: err
          }
        }));
      }
    })
    .catch(error => {
      dispatch(loginFailure(error));
    })
  }
}

export function signUpAndLogin(name, email, password, redirect="/dashboard") {
  return function(dispatch) {
    axios.post('http://localhost:3000/users/', {
      name: name,
      email: email,
      password: password
    })
    .then((response) => {
      dispatch(login(response.data[0].email, response.data[0].password, redirect, true));
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    })
  }
}
