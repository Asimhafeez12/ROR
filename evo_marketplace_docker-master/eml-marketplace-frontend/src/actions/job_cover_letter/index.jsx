import JobCoverLetter from './../../api/job_cover_letter';
export function fetchJobCoverLetter(user_id, job_id) {
  return function(dispatch) {
    return JobCoverLetter.fetch(user_id, job_id).then(response => {
    	dispatch({type: "FETCH_JOB_COVER_LETTER", ...response})
    })
  }
}
