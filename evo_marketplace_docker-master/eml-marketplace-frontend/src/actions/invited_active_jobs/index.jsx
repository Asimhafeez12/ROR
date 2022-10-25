import InvitedActiveJob from './../../api/invited_active_job';

export function fetch() {
  return function(dispatch) {
    return InvitedActiveJob.fetch().then((res) => (
      dispatch({type: 'FETCH_ALL_INVITED_ACTIVE_JOBS', ...res})
    ));
  }
}
