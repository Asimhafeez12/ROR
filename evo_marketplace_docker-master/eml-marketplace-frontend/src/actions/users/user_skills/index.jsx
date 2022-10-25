import UserSkills from './../../../api/users/user_skills';


export function fetch(user_id) {
  return function(dispatch) {
    return UserSkills.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_SKILLS', ...res})
    ));
  }
}


