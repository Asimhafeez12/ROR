const initial_state = {
  completed_jobs: []
}

export default function FreelancerCompletedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_FREELANCER_COMPLETED_JOBS":
      return {completed_jobs: action.data}
    default:
      return state;
  }
}
