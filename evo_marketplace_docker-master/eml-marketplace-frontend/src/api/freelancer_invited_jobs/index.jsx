import API from './../index'
class FreelancerInvitedJobs {

  static fetch() {
    return API.get(`/api/v1/freelancer_invited_jobs.json`);
  }
}

export default FreelancerInvitedJobs
