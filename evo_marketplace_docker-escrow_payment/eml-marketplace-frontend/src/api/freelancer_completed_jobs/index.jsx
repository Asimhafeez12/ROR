import API from './../index'
class FreelancerCompletedJobs {

  static fetch() {
    return API.get(`/api/v1/freelancer_completed_jobs.json`);
  }
}

export default FreelancerCompletedJobs
