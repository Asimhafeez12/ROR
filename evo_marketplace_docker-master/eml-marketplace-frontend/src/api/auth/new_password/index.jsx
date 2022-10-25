import API from '../../index';

class NewPassword {
  static verify(data) {
    return API.post("/api/v1/passwords.json", data).catch( error => {
      return error.response.data
    });
  }
}

export default NewPassword
