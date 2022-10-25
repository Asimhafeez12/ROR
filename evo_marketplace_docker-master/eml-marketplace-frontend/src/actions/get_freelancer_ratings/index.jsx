import GetFreelancerRating from './../../api/get_freelancer_ratings';


export function fetch(job_id, user_id) {
  return function(dispatch) {
    return GetFreelancerRating.fetch(job_id, user_id).then((res) => (
      dispatch({ type: 'GET_FREELANCER_RATING', ...res})
    ))
  }
}