import JobMilestone from './../../api/job_milestones';

export function fetch(job_id) {
  return function(dispatch) {
    return JobMilestone.fetch(job_id).then((res) => (
      dispatch({type: 'FETCH_ALL_PROJECT_MILESTONES', ...res})
    ));
  }
}

export function add(job_id, data) {
  return function(dispatch) {
    return JobMilestone.post(job_id, data).then((res) => (
      dispatch({type: 'ADD_ALL_PROJECT_MILESTONE', ...res})
    ))
  }
}

export function update(job_id, milestone_id, data) {
  return function(dispatch) {
    return JobMilestone.update(job_id, milestone_id, data).then((res) => (
      dispatch({ type: 'UPDATE_CURRENT_PROJECT_MILESTONE', ...res})
    ))
  }
}

export function remove(job_id, milestone_id) {
  return function(dispatch) {
    return JobMilestone.remove(job_id, milestone_id).then((res) => (
      dispatch({ type: 'REMOVE_PROJECT_MILESTONE', ...res})
    ))
  }
}