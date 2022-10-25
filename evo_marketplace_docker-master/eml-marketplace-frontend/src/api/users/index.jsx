import API from './../index';

class ViewUser {
  static fetch(id) {
    return API.get(`/api/v1/users/${id}.json`).catch(
      error => { return error; }
    );
  }
  static update(data) {
    return API.post(`/api/v1/users.json`, data).catch(
      error => { return error; }
    );
  }
  static update_password(data) {
    return API.patch(`/api/v1/registrations.json`, data).catch(
      error => { return error; }
    );
  }
  static current() {
    return API.get('/api/v1/current_user/me.json').catch(
      error => { return error }
    );
  }
}

export default ViewUser
