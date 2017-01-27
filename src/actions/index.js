import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { push } from 'react-router-redux'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// const API_URL = 'http://78.47.217.227:3000/';
const API_URL = 'http://localhost:3000/';
const UNAUTHORIZED = 'Wrong email or password';
const WRONG_FIELD = 'Please check ';
const SERVER_ERROR = 'Server error occurred';

/**
 * Login success action
 * @param  {obj} access_token
 * @return {obj}
 */
export function loginSuccess(access_token) {
  localStorage.setItem('access_token', access_token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      access_token: access_token
    }
  }
}

/**
 * Login failure action
 * @param  {obj} error
 * @return {obj}
 */
export function loginFailure(error) {
  localStorage.removeItem('access_token');
  let message = '';

  // TODO refactor messageing
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

/**
 * Login request action
 * @return {obj}
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

/**
 * Logout action
 * @return {obj}
 */
export function logout() {
  localStorage.removeItem('access_token');
  return {
    type: LOGOUT
  }
}

/**
 * Log out and redirect action
 * @return {obj}
 */
export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  }
}

/**
 * Login: authenticate user and create token
 * @param  {String} email
 * @param  {String} password
 * @param  {String} redirect
 * @param  {Boolean} hashedPass
 * @return {obj}
 */
export function login(email, password, redirect = "/dashboard", hashedPass = false) {
  return function(dispatch) {
    dispatch(loginRequest());

    // make post request
    axios.post(API_URL + 'token/', {
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

/**
 * Register and login: create and authenticate user
 * @param  {String} name
 * @param  {String} email
 * @param  {String} password
 * @param  {String} redirect
 * @return {obj}
 */
export function signUpAndLogin(name, email, password, redirect="/dashboard") {
  return function(dispatch) {
    axios.post(API_URL + 'users/', {
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
