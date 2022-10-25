import ViewUser from './../../api/users';
export function fetchViewUser(id) {
  return function(dispatch) {
    return ViewUser.fetch(id).then(response => {
    	dispatch({type: "FETCH_VIEW_USER", ...response})
    })
  }
}

export function update(data) {
  return function(dispatch) {
    return ViewUser.update(data).then((res) => (
      dispatch({ type: 'UPDATE_USER', ...res})
    ))
  }
}

export function update_password(data) {
  return function(dispatch) {
    return ViewUser.update_password(data).then((res) => (
      dispatch({ type: 'UPDATE_USER_PASSWORD', ...res})
    ))
  }
}