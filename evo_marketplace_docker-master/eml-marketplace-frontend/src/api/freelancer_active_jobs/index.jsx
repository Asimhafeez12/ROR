import API from './../index'
class FreelancerActiveJobs {

  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/freelancer_active_jobs.json`);
  }
}

export default FreelancerActiveJobs

