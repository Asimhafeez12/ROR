import AcceptInvitedFreelancers from './../../api/accept_invited_freelancers';

export function acceptFreelancers(job_id, data) {
  return function(dispatch) {
    return AcceptInvitedFreelancers.accept(job_id, data).then( (response) => {
      return dispatch({type: 'FETCH_ALL_ACCEPTED_FREELANCERS', ...response});
    });
  }
}

export function fetch(job_id) {
  return function(dispatch) {
    return AcceptInvitedFreelancers.fetch(job_id).then( (response) => {
      dispatch({type: "FETCH_ALL_ACCEPTED_FREELANCERS", ...response}) } );
  }
}
