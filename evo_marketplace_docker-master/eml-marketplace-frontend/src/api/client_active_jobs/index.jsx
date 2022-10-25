import API from './../index';

class ClientActiveJobs {
  static fetch() {
    return API.get(`/api/v1/client_active_jobs/${1}.json`).catch(
      error => { return error; }
    );
  }
}

export default ClientActiveJobs;