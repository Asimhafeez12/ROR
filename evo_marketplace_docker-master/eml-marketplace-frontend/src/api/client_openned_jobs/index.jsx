import API from './../index';

class ClientOpennedJobs {
  static fetch() {
    return API.get(`/api/v1/client_openned_jobs/${1}.json`).catch(
      error => { return error; }
    );
  }
}

export default ClientOpennedJobs;