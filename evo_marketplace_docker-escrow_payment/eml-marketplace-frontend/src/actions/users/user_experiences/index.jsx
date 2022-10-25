import UserExperience from './../../../api/users/user_experiences';

export function add(data) {
  return function(dispatch) {
    return UserExperience.post(data).then((res) => (
      dispatch({type: 'ADD_ALL_EXPERIENCE', ...res})
    ))
  }
}

export function update(user_experience_id, data) {
  return function(dispatch) {
    return UserExperience.update(user_experience_id, data).then((res) => (
      dispatch({ type: 'UPDATE_EXPERIENCE', ...res})
    ))
  }
}

export function remove(user_experience_id) {
  return function(dispatch) {
    return UserExperience.remove(user_experience_id).then((res) => (
      dispatch({ type: 'REMOVE_EXPERIENCE', ...res})
    ))
  }
}

export function fetch(user_id) {
  return function(dispatch) {
    return UserExperience.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_EXPERIENCES', ...res})
    ));
  }
}


