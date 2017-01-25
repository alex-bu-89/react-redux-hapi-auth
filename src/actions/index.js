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
  localStorage.removeItem('token');
  return {
    type: LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
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
        dispatch(loginSuccess('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.WDAYU27nrQwZvJTx4NDx3y-iVlZJ3XTwes5UjaAAWAo'));
        // return fetch('http://localhost:3000/auth/getToken/', {
        //     method: 'post',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //         body: JSON.stringify({email: email, password: password})
        //     })
        //     .then(checkHttpStatus)
        //     .then(parseJSON)
        //     .then(response => {
        //         try {
        //             let decoded = jwtDecode(response.token);
        //             dispatch(loginSuccess(response.token));
        //             dispatch(pushState(null, redirect));
        //         } catch (e) {
        //             dispatch(loginFailure({
        //                 response: {
        //                     status: 403,
        //                     statusText: 'Invalid token'
        //                 }
        //             }));
        //         }
        //     })
        //     .catch(error => {
        //         dispatch(loginFailure(error));
        //     })
    }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch('http://localhost:3000/getData/', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginFailure(error));
                  dispatch(pushState(null, '/login'));
                }
            })
       }
}
