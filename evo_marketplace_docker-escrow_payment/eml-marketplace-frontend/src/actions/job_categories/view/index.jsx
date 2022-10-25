import ViewJobCategory from './../../../api/job_categories/view';
export function fetchViewJobCategory(id) {
  return function(dispatch) {
    return ViewJobCategory.fetch(id).then(response => {
      dispatch({type: "FETCH_VIEW_JOB_CATEGORY", ...response})
    })
  }
}
