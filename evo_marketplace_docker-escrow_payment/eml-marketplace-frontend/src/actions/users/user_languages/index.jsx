import UserLanguages from './../../../api/users/user_languages';


export function fetch(user_id) {
  return function(dispatch) {
    return UserLanguages.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_LANGUAGES', ...res})
    ));
  }
}


