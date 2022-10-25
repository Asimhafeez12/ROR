import API from './../index';

class JobCoverLetter {
  static fetch(user_id, job_id)  {
    return API.get(`/api/v1/jobs/${job_id}/job_cover_letters/${user_id}.json`).catch(
      error => { return error; }
    );
  }
}

export default JobCoverLetter
