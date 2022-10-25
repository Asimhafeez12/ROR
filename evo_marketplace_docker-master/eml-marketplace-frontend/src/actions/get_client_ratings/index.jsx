import GetClientRating from './../../api/get_client_ratings';


export function fetch(job_id, user_id) {
  return function(dispatch) {
    return GetClientRating.fetch(job_id, user_id).then((res) => (
      dispatch({ type: 'GET_CLIENT_RATING', ...res})
    ))
  }
}