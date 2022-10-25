const initial_state = {
  accepted_freelancers: []
}

export default function AcceptedFreelancersReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_ACCEPTED_FREELANCERS":
      return {accepted_freelancers: action.data}
    default:
      return state;
  }
}
