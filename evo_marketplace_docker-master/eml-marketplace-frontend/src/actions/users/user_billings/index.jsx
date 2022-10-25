import UserBilling from './../../../api/users/user_billings';

export function add(user_id, data) {
  return function(dispatch) {
    return UserBilling.post(user_id, data).then((res) => (
      dispatch({type: 'ADD_USER_BILLING', ...res})
    ))
  }
}

export function fetch(user_id) {
  return function(dispatch) {
    return UserBilling.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_USER_BILLING', ...res})
    ));
  }
}



