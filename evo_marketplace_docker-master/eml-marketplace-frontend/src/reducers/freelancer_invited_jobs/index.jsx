const initial_state = {
  invited_jobs: []
}

export default function FreelancerInvitedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_FREELANCER_INVITED_JOBS":
      return {invited_jobs: action.data}
    default:
      return state;
  }
}
