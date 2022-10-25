import API from '../../index';

class UserSkills {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_skills.json`);
  }
}

export default UserSkills
