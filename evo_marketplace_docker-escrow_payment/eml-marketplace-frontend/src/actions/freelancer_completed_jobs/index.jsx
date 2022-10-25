import FreelancerCompletedJobs from './../../api/freelancer_completed_jobs';

export function fetch() {
  return function(dispatch) {
    return FreelancerCompletedJobs.fetch().then( (response) => {
      dispatch({type: "FETCH_ALL_FREELANCER_COMPLETED_JOBS", ...response}) } );
  }
}
