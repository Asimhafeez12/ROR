import API from './../index';

class ClientWizard  {
  static save(data) {
    return API.post('/api/v1/update_client_wizards.json', data).catch( error => {
        return error;
      });
  }
}

export default ClientWizard;