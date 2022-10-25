export default function invitedFreelancerReducer(state={invited_freelancers: []}, action) {
  switch(action.type) {
    case 'FETCH_INVITED_FREELANCER':
      return { invited_freelancers: action.data }
    default:
      return state
  }
}
