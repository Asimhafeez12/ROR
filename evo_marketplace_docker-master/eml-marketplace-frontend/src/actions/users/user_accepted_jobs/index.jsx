import UserAcceptedJobs from './../../../api/users/user_accepted_jobs';


export function fetch(user_id) {
  return function(dispatch) {
    return UserAcceptedJobs.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_ACCEPTED_JOBS', ...res})
    ));
  }
}


