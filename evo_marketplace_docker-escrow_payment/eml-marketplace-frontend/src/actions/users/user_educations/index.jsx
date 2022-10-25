import UserEducation from './../../../api/users/user_educations';


export function add(data) {
  return function(dispatch) {
    return UserEducation.post(data).then((res) => (
      dispatch({type: 'ADD_ALL_EDUCATION', ...res})
    ))
  }
}

export function update(user_education_id, data) {
  return function(dispatch) {
    return UserEducation.update(user_education_id, data).then((res) => (
      dispatch({ type: 'UPDATE_EDUCATION', ...res})
    ))
  }
}

export function remove(user_education_id) {
  return function(dispatch) {
    return UserEducation.remove(user_education_id).then((res) => (
      dispatch({ type: 'REMOVE_EDUCATION', ...res})
    ))
  }
}

export function fetch(user_id) {
  return function(dispatch) {
    return UserEducation.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_EDUCATIONS', ...res})
    ));
  }
}


