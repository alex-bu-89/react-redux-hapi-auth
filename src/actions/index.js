export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

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
  return {
    type: LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      message: error.response.message
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
    dispatch(pushState(null, '/login'));
  }
}

export function login(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginRequest());
        return fetch('http://localhost:3000/token/', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({email: email, password: password})
          })
          .then((response) => {
              console.log(response);
              // try {
              //     let decoded = jwtDecode(response.token);
              //     dispatch(loginSuccess(response.token));
              //     dispatch(pushState(null, redirect));
              // } catch (e) {
              //     dispatch(loginFailure({
              //         response: {
              //             status: 403,
              //             statusText: 'Invalid token'
              //         }
              //     }));
              // }
          })
          .catch(error => {
              dispatch(loginFailure(error));
          })
    }
}
