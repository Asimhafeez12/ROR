import FreelancerActiveJobs from './../../api/freelancer_active_jobs';

export function fetch(user_id) {
  return function(dispatch) {
    return FreelancerActiveJobs.fetch(user_id).then( (response) => {
      dispatch({type: "FETCH_ALL_FREELANCER_ACTIVE_JOBS", ...response}) } );
  }
}
