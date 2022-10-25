import Registrations from './../../../api/auth/registrations';

export function registerUser(user_data) {
  return function(dispatch) {
    return Registrations.save(user_data).then(response => {
      dispatch(loadRegisterUser(response.data));
    }).catch(error => {
      throw(error);
    });
  }
}

export function loadRegisterUser(data) {
  if("errors" in data){
    return { type: 'ERROR_REGISTER_USER', data }
  } else {
    return { type: 'LOAD_REGISTER_USER', data }
  }
}

export function updateFLRPersonalInformation(data) {
  return function(dispatch) {
    return dispatch({ type: 'UPDATE_FLR_PERSONAL_INFORMATION', data: data });
  }
}

export function updateFLRSkillList(data) {
  return function(dispatch) {
    return dispatch({ type: 'UPDATE_FLR_SKILLS_LIST', data: data})
  }
}

export function appendFLRCertifications(data) {
  return function(dispatch) {
    return dispatch({ type: 'APPEND_FLR_CERTIFICATION', data: data })
  }
}

export function removeFLRCertification(data) {
  return function(dispatch) {
    return dispatch({ type: 'REMOVE_FLR_CERTIFICATION', data: data });
  }
}

export function appendFLRExperiences(data) {
  return function(dispatch) {
    return dispatch({ type: 'APPEND_FLR_EXPERIENCE', data: data })
  }
}
