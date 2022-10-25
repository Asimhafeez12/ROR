import API from './../index';

class JobWizard  {
  static save(data) {
    return API.post('/api/v1/job_creation_wizards.json', data).catch( error => {
        return error;
      });
  }
}

export default JobWizard;