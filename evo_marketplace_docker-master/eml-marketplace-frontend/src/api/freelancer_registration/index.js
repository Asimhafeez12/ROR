import API from '../index';


class FreelancerRegistration {
  static validate(data) {
    return API.post('/api/v1/validate_freelancers.json', data).catch( error => error )
  }
}

export default FreelancerRegistration;
