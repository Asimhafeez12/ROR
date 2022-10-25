import InvitedOpennedJobs from './../../api/invited_openned_jobs';

export function fetchAllOpennedJobs() {
  return function(dispatch) {
    InvitedOpennedJobs.fetch().then((response) => {
      return dispatch({type: 'LOAD_ALL_OPENNED_INVITED_JOBS', ...response});
    });
  }
}
