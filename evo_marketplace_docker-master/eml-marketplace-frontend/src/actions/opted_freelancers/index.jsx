import OptInvitedFreelancers from './../../api/opt_invited_freelancers';

export function optFreelancers(job_id, data) {
  return function(dispatch) {
    return OptInvitedFreelancers.opt(job_id, data).then( (response) => {
      return dispatch({type: 'FETCH_ALL_OPTED_FREELANCERS', ...response});
    });
  }
}

export function fetch(job_id) {
  return function(dispatch) {
    return OptInvitedFreelancers.fetch(job_id).then( (response) => {
      dispatch({type: "FETCH_ALL_OPTED_FREELANCERS", ...response}) } );
  }
}
