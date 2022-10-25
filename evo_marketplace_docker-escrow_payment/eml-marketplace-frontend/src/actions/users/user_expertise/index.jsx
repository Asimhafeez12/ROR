import UserExpertise from './../../../api/users/user_expertise';


export function fetch(user_id) {
  return function(dispatch) {
    return UserExpertise.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_EXPERTISE', ...res})
    ));
  }
}


