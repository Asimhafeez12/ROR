import JobBonus from './../../api/job_bonus';


export function add(job_id, data) {
  return function(dispatch) {
    return JobBonus.post(job_id, data).then((res) => (
      dispatch({type: 'ADD_JOB_BONUS', ...res})
    ))
  }
}