import API from './../index';
class InvitedActiveJob {
  static fetch() {
    return API.get('/api/v1/invited_accepted_jobs.json');
  }
}
export default InvitedActiveJob;
