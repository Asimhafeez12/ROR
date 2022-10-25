import API from '../../index';

class SignIn {
  static verify(data) {
    return API.post("/api/v1/sign_in.json", data).catch( error => {
      return error.response.data
    });
  }
}

export default SignIn
