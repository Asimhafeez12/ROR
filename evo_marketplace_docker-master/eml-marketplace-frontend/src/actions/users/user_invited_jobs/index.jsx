import UserInvitedJobs from './../../../api/users/user_invited_jobs';


export function fetch(user_id) {
  return function(dispatch) {
    return UserInvitedJobs.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_INVITED_JOBS', ...res})
    ));
  }
}


