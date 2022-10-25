import UserCertificate from './../../../api/users/user_certificates';

export function add(data) {
  return function(dispatch) {
    return UserCertificate.post(data).then((res) => (
      dispatch({type: 'ADD_ALL_CERTIFICATE', ...res})
    ))
  }
}

export function update(user_certificate_id, data) {
  return function(dispatch) {
    return UserCertificate.update(user_certificate_id, data).then((res) => (
      dispatch({ type: 'UPDATE_CERTIFICATE', ...res})
    ))
  }
}


export function remove(user_certificate_id) {
  return function(dispatch) {
    return UserCertificate.remove(user_certificate_id).then((res) => (
      dispatch({ type: 'REMOVE_CERTIFICATE', ...res})
    ))
  }
}

export function fetch(user_id) {
  return function(dispatch) {
    return UserCertificate.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_CERTIFICATES', ...res})
    ));
  }
}



