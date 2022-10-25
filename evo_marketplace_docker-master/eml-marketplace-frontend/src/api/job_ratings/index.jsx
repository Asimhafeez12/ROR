import API from './../index';

class JobRating {

  static fetch(job_id, user_id) {
    return API.get(`/api/v1/jobs/${job_id}/job_ratings/${user_id}.json`);
  }
  static post(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/job_ratings.json`, data);
  }
}

export default JobRating
