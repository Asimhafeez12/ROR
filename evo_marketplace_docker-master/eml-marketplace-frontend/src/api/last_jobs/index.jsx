import API from './../index';

class LastJob {
  static fetch() {
    return API.get(`/api/v1/last_jobs.json`).catch(
      error => { return error; }
    );
  }
}

export default LastJob
