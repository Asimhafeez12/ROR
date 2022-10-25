export default function MyJobsReducer(state={jobs: []}, action) {
  switch(action.type) {
    case "FETCH_MY_JOBS":
      return action;
    default:
      return state
  }
}
