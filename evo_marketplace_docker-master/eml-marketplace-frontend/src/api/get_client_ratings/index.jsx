import API from './../index';

class GetClientRating {

  static fetch(job_id, user_id) {
    return API.get(`/api/v1/jobs/${job_id}/get_client_ratings/${user_id}.json`);
  }
}

export default GetClientRating
