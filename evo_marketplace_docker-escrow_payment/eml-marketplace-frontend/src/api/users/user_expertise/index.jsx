import API from '../../index';

class UserExpertise {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_expertise.json`);
  }
}

export default UserExpertise
