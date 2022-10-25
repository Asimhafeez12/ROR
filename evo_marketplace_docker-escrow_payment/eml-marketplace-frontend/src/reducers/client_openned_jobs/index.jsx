export default function ClientOpennedJobsReducer(state={client_openned_jobs: 0}, action) {
  switch(action.type) {
    case "CLIENT_OPENNED_JOBS":
      return action.data;
    default:
      return state
  }
}
