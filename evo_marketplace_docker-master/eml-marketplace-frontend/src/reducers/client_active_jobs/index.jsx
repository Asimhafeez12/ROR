export default function ClientActiveJobsReducer(state={client_active_jobs: 0}, action) {
  switch(action.type) {
    case "CLIENT_ACTIVE_JOBS":
      return action.data;
    default:
      return state
  }
}
