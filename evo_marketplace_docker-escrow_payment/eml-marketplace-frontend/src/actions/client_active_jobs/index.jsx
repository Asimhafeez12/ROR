import ClientActiveJobs from './../../api/client_active_jobs';

export function fetch() {
  return function(dispatch) {
    return ClientActiveJobs.fetch().then((response) => {
      dispatch({type: 'CLIENT_ACTIVE_JOBS', ...response})
    });
  }
}
