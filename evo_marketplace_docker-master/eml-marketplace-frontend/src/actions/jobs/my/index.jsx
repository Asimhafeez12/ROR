import MyJobs from './../../../api/jobs/my';

export function fetchMyJobs(jobType="open") {
  return function(dispatch) {
    return MyJobs.fetch(jobType).then(response => {
      dispatch(sendMyJobsStatus(response.data));
    })

  }
}

function sendMyJobsStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_MY_JOBS", data };
  } else {
    return { type: "FETCH_MY_JOBS", jobs: data };
  }
}
