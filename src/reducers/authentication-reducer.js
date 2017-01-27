import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions'
import jwt_decode from 'jwt-decode';

const initialState = {
    id: null,
    userName: null,
    email: null,
    access_token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    message: null
};

/**
 * Authentication reducer
 * Change state of the app
 */
function authenticationReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        'isAuthenticating': true,
        'message': null
      });
    case LOGIN_SUCCESS:
      // take info from token
      const user = jwt_decode(action.payload.access_token).user;

      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'id': user.id,
        'access_token': action.payload.access_token,
        'userName': user.name,
        'email': user.email,
        'message': 'You have been successfully logged in.'
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'access_token': null,
        'id': null,
        'userName': null,
        'email': null,
        'message': `${action.payload.message}`
      });
    case LOGOUT:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'access_token': null,
        'id': null,
        'userName': null,
        'email': null,
        'message': 'You have been successfully logged out.'
      });
    default:
      return initialState
  }
};

export default authenticationReducer;
