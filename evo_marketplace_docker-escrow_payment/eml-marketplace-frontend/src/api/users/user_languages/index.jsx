import API from '../../index';

class UserLanguages {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_languages.json`);
  }
}

export default UserLanguages
