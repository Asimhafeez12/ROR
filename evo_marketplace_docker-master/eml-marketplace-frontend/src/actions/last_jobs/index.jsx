import LastJob from './../../api/last_jobs/';
export function fetchLastJob() {
  return function(dispatch) {
    return LastJob.fetch().then(response => {
      dispatch({type: "FETCH_LAST_JOB", ...response})
    })
  }
}
