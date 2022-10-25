import JobCategory from './../../api/job_categories';

export function fetchJobCategory() {
  return function(dispatch) {
    return JobCategory.fetch().then(response => {
      dispatch(sendJobCategoryStatus(response.data));
    })

  }
}

function sendJobCategoryStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_JOB_CATEGORY", data };
  } else {
    return { type: "FETCH_JOB_CATEGORY", job_categories: data };
  }
}
