import FreelancerActiveJobs from './../../api/freelancer_active_jobs';

export function fetch() {
  return function(dispatch) {
    return FreelancerActiveJobs.fetch().then( (response) => {
      dispatch({type: "FETCH_ALL_FREELANCER_ACTIVE_JOBS", ...response}) } );
  }
}
