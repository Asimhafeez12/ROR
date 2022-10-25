import ClientOpennedJobs from './../../api/client_openned_jobs';

export function fetch() {
  return function(dispatch) {
    return ClientOpennedJobs.fetch().then((response) => {
      dispatch({type: 'CLIENT_OPENNED_JOBS', ...response})
    });
  }
}
