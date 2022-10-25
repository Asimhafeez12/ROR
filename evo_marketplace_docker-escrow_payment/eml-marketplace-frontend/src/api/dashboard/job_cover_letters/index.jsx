import API from './../../index';

class JobCoverLetter {
  static post(data) {
    return API.post(`/api/v1/jobs/${data.job_cover_letter.job_id}/job_cover_letters.json`, data);
  }
}

export default JobCoverLetter
