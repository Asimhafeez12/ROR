import SignIn from './../../../api/auth/sign_in';


export function checkLoggedIn(data) {
  return function(dispatch) {
    return SignIn.verify(data).then(response => {
      dispatch(verifyLoggedInResponse(response));
      return Promise.resolve(response);
    }).catch( error => {
    });
  }
}

export function verifyLoggedInResponse(res) {
  if ("error" in res) {
    return { type: 'ERROR_LOGGED_IN', data: res }
  } else {

    return { type: 'LOGGED_IN_SUCCESS', data: res }
  }
}
