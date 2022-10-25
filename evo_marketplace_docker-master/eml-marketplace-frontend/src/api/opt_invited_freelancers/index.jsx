import API from './../index'
class OptInvitedFreelancers {
  static opt(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/opt_invited_freelancers.json`, data);
  }
  static fetch(job_id) {
    return API.get(`/api/v1/jobs/${job_id}/opt_invited_freelancers.json`);
  }
}

export default OptInvitedFreelancers
