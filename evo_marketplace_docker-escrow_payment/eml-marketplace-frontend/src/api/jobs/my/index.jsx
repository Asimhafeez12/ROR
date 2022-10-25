import API from './../../index';

class MyJobs {
  static fetch(jobType) {
    return API.get(`/api/v1/my_jobs.json?q[state_eq]=${jobType}`).catch(
      error => { return error; }
    );
  }
}

export default MyJobs;
