import API from '../../index';

class UserEducation {
  static post(data) {
    return API.post('/api/v1/user_educations.json', data);
  }
  static update(user_education_id, data) {
    return API.put(`/api/v1/user_educations/${user_education_id}.json`, data);
  }
  static remove(user_education_id) {
    return API.delete(`/api/v1/user_educations/${user_education_id}.json`);
  }
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_educations.json`);
  }

}

export default UserEducation
