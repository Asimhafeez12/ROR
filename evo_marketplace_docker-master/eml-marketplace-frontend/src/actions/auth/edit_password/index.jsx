import EditPassword from './../../../api/auth/edit_password';

export function checkLoggedIn(data) {
  return function(dispatch) {
    return EditPassword.verify(data).then(response => {
      dispatch(verifyLoggedInResponse(response));
      return Promise.resolve(response);
    })
  }
}

export function verifyLoggedInResponse(response) {
  if ("errors" in response) {
    return { type: 'ERROR_EDIT_PASSWORD_IN', data: response.errors }
  } else {
    return { type: 'EDIT_PASSWORD_SUCCESS', data: response.data }
  }
}
