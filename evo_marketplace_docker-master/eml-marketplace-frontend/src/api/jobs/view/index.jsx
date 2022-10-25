import API from './../../index';

class ViewJob {
  static fetch(id) {
    return API.get(`/api/v1/jobs/${id}.json`).catch(
      error => { return error; }
    );
  }
}

export default ViewJob
