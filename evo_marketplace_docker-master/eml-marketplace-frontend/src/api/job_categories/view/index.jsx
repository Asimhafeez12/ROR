import API from './../../index';

class ViewJobCategory {
  static fetch(id) {
    return API.get(`/api/v1/job_categories/${id}.json`).catch(
      error => { return error; }
    );
  }
}

export default ViewJobCategory
