import API from './../index';

class JobBonus {

  static post(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/job_incentives.json`, data);
  }
}

export default JobBonus
