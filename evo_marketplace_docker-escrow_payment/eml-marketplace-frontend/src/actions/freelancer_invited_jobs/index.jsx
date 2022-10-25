import FreelancerInvitedJobs from './../../api/freelancer_invited_jobs';

export function fetch() {
  return function(dispatch) {
    return FreelancerInvitedJobs.fetch().then( (response) => {
      dispatch({type: "FETCH_ALL_FREELANCER_INVITED_JOBS", ...response}) } );
  }
}
