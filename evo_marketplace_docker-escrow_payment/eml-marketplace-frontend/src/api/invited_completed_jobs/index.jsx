import API from './../index';
class InvitedCompletedJobs {
  static fetch() {
    return API.get("/api/v1/invited_completed_jobs.json");
  }
  static completed(job_id) {
  	return API.patch(`/api/v1/jobs/${job_id}.json`, {job: {state_event: "completed"}})
  }
}

export default InvitedCompletedJobs;
