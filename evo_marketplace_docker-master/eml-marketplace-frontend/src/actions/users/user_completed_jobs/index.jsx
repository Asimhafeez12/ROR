import UserCompletedJobs from './../../../api/users/user_completed_jobs';


export function fetch(user_id) {
  return function(dispatch) {
    return UserCompletedJobs.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_COMPLETED_JOBS', ...res})
    ));
  }
}


