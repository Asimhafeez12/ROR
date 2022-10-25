const initial_state = {
  active_jobs: []
}

export default function FreelancerActiveJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_FREELANCER_ACTIVE_JOBS":
      return {active_jobs: action.data}
    default:
      return state;
  }
}
