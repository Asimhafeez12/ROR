import ViewJob from './../../../api/jobs/view';
export function fetchViewJob(id) {
  return function(dispatch) {
    return ViewJob.fetch(id).then(response => {
      dispatch({type: "FETCH_VIEW_JOB", ...response})
    })
  }
}
