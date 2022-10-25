import InvitedFreelancer from './../../../api/jobs/invited_freelancers';

export function fetchFreelancers(id){
  return function(dispatch) {
    return InvitedFreelancer.fetch(id).then( response => {
      dispatch({type: 'FETCH_INVITED_FREELANCER', ...response})
    })
  }
}
