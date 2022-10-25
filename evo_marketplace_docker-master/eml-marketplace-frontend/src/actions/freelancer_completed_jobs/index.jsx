import FreelancerCompletedJobs from './../../api/freelancer_completed_jobs';

export function fetch(user_id) {
  return function(dispatch) {
    return FreelancerCompletedJobs.fetch(user_id).then( (response) => {
      dispatch({type: "FETCH_ALL_FREELANCER_COMPLETED_JOBS", ...response}) } );
  }
}
