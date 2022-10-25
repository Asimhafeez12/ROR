import API from './../index';

class GetFreelancerRating {

  static fetch(job_id, user_id) {
    return API.get(`/api/v1/jobs/${job_id}/get_freelancer_ratings/${user_id}.json`);
  }
}

export default GetFreelancerRating
