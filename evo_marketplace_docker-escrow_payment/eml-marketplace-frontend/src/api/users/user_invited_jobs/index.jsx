import API from '../../index';

class UserInvitedJobs {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_invited_jobs.json`);
  }
}

export default UserInvitedJobs
