import API from '../../index';

class UpdateJobCategory {
  static update(job_id, data) {
    return API.put(`/api/v1/edit_jobs/${job_id}.json`, data).catch( error => {
      return error.response.data
    });
  }
}

export default UpdateJobCategory;
