import API from './../index'
class FreelancerCompletedJobs {

  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/freelancer_completed_jobs.json`);
  }
}

export default FreelancerCompletedJobs
