import API from './../index'
class FreelancerActiveJobs {

  static fetch() {
    return API.get(`/api/v1/freelancer_active_jobs.json`);
  }
}

export default FreelancerActiveJobs
