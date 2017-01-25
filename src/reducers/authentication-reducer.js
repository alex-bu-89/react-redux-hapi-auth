import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions'
import jwtDecode from 'jwt-decode';

const initialState = {
    userName: null,
    email: null,
    access_token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    message: null
};

function authenticationReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        'isAuthenticating': true,
        'message': null
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'access_token': action.payload.access_token,
        'userName': jwtDecode(action.payload.access_token).userName,
        'message': 'You have been successfully logged in.'
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'access_token': null,
        'userName': null,
        'message': `Authentication Error: ${action.status} ${action.message}`
      });
    case LOGOUT:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'access_token': null,
        'userName': null,
        'message': 'You have been successfully logged out.'
      });
    default:
      return initialState
  }
};

export default authenticationReducer;
