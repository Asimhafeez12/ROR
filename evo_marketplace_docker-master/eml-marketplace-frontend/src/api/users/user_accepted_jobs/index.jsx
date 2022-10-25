import API from '../../index';

class UserAcceptedJobs {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_accepted_jobs.json`);
  }
}

export default UserAcceptedJobs
