import API from '../../index';

class Registrations  {
  static save(user_data) {
    return API.post('/api/v1/registrations.json', user_data).catch( error => {
        return error;
      });
  }
}

export default Registrations
