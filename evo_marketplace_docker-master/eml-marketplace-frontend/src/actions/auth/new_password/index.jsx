import NewPassword from './../../../api/auth/new_password';

export function checkLoggedIn(data) {
  return function(dispatch) {
    return NewPassword.verify(data).then(response => {
      dispatch(verifyLoggedInResponse(response));
    }).catch( error => {
    });
  }
}

export function verifyLoggedInResponse(data) {
  if ("error" in data) {
    return { type: 'ERROR_LOGGED_IN', data }
  } else {
    return { type: 'LOGGED_IN_SUCCESS', data }
  }
}
