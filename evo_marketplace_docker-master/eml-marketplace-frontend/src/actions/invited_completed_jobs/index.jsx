import InvitedcompletedJobs from './../../api/invited_completed_jobs';
export function fetch() {
  return function(dispatch) {
    return InvitedcompletedJobs.fetch().then((res) => (
      dispatch({type: 'FETCH_ALL_INVITED_COMPLETED_JOBS', ...res})
    ));
  }
}

export function AcceptJobs(job_id, data) {
  return function(dispatch) {
    return InvitedcompletedJobs.completed(job_id).then( (response) => {
      return dispatch({type: 'FETCH_ALL_INVITED_COMPLETED_JOBS', ...response});
    });
  }
}