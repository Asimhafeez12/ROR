import API from './../index';

class FreelancerProfileEdit  {
  static save(data) {
    return API.post('/api/v1/freelancer_edit_profiles.json', data).catch( error => {
        return error;
      });
  }
}

export default FreelancerProfileEdit;
