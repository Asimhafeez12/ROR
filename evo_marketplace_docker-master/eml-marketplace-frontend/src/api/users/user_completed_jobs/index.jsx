import API from '../../index';

class UserCompletedJobs {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_completed_jobs.json`);
  }
}

export default UserCompletedJobs
