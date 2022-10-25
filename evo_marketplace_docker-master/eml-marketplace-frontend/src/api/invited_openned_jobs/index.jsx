import API from './../index';
class InvitedOpennedJobs {
  static fetch() {
    return API.get("/api/v1/invited_openned_jobs.json");
  }
}

export default InvitedOpennedJobs;
