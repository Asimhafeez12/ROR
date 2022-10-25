import API from '../../index';

class UserExperience {
  static post(data) {
    return API.post('/api/v1/user_experiences.json', data);
  }
  static update(user_experience_id, data) {
    return API.put(`/api/v1/user_experiences/${user_experience_id}.json`, data);
  }
  static remove(user_experience_id) {
    return API.delete(`/api/v1/user_experiences/${user_experience_id}.json`);
  }
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_experiences.json`);
  }
}

export default UserExperience
