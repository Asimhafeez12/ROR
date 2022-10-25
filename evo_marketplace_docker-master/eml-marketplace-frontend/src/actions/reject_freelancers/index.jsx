import RejectInvitedFreelancers from './../../api/reject_invited_freelancers';

export function rejectFreelancers(job_id, data) {
  return function(dispatch) {
    return RejectInvitedFreelancers.reject(job_id, data).then( (response) => {
      return dispatch({type: 'FETCH_ALL_REJECTED_FREELANCERS', ...response});
    });
  }
}