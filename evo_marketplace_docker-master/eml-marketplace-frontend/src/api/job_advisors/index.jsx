import API from './../index';

class JobAdvisor {
  static post(data) {
    return API.post('/api/v1/job_advisors.json', data);
  }
}

export default JobAdvisor
