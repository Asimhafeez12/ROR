import API from '../../index';

class EmailConfirmation {
  static confirm(token) {
    return API.get(`/api/v1/confirmations.json?confirmation_token=${token}`).catch( error => {
      return error.response.data
    });
  }
}

export default EmailConfirmation;
