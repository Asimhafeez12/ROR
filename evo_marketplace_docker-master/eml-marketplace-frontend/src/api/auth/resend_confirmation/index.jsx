import API from '../../index';

class ResendConfirmation {
  static confirm() {
    return API.post("/api/v1/confirmations.json").catch( error => {
      return error.response.data
    });
  }
}

export default ResendConfirmation;
