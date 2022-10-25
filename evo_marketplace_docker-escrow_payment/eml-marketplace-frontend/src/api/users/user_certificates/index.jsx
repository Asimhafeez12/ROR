import API from '../../index';

class UserCertificate {

  static post(data) {
    return API.post('/api/v1/user_certificates.json', data);
  }

  static update(user_certificate_id, data) {
    return API.put(`/api/v1/user_certificates/${user_certificate_id}.json`, data);
  }

  static remove(user_certificate_id) {
    return API.delete(`/api/v1/user_certificates/${user_certificate_id}.json`);
  }

  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_certificates.json`);
  }
}


export default UserCertificate
