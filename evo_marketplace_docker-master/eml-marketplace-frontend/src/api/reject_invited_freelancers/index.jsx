import API from './../index'
class RejectInvitedFreelancers {
  static reject(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/reject_invited_freelancers.json`, data);
  }
}

export default RejectInvitedFreelancers
