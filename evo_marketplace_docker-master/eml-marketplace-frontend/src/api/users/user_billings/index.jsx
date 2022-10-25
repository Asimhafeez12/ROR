import API from '../../index';

class UserBilling {

  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_billings.json`);
  }
  static post(user_id, data) {
    return API.post(`/api/v1/users/${user_id}/user_billings.json`, data);
  }
}

export default UserBilling
