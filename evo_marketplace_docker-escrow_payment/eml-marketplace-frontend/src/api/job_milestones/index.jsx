import API from './../index';

class JobMilestone {
  static fetch(job_id) {
    return API.get(`/api/v1/jobs/${job_id}/project_milestones.json`);
  }
  static post(job_id, data) {
    return API.post(`/api/v1/jobs/${job_id}/project_milestones.json`, data);
  }
  static remove(job_id, milestone_id) {
    return API.delete(`/api/v1/jobs/${job_id}/project_milestones/${milestone_id}.json`);
  }
  static update(job_id, milestone_id, data) {
    return API.put(`/api/v1/jobs/${job_id}/project_milestones/${milestone_id}.json`, data);
  }
}

export default JobMilestone
