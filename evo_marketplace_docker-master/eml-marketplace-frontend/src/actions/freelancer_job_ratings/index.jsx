import JobRating from './../../api/job_ratings';


export function fetch(job_id, user_id) {
  return function(dispatch) {
    return JobRating.fetch(job_id, user_id).then((res) => (
      dispatch({ type: 'GET_FREELANCER_JOB_RATING', ...res})
    ))
  }
}

export function add(job_id, data) {
  return function(dispatch) {
    return JobRating.post(job_id, data).then((res) => (
      dispatch({type: 'ADD_FREELANCER_JOB_RATING', ...res})
    ))
  }
}