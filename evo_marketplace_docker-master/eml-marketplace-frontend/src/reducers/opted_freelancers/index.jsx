const initial_state = {
  opted_freelancers: []
}

export default function OptedFreelancersReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_OPTED_FREELANCERS":
      return {opted_freelancers: action.data}
    default:
      return state;
  }
}
