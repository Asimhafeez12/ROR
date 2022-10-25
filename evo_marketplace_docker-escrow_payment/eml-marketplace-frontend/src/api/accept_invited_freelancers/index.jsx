import API from './../index'
class AcceptInvitedFreelancers {
  static accept(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/accept_invited_freelancers.json`, data);
  }
  static fetch(job_id) {
    return API.get(`/api/v1/jobs/${job_id}/accept_invited_freelancers.json`);
  }
}

export default AcceptInvitedFreelancers
