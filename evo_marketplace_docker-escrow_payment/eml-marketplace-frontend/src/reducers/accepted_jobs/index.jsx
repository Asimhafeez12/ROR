const initial_state = {
  jobs: []
};

export default function AcceptedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case "FETCH_ALL_INVITED_COMPLETED_JOBS":
      return {accepted_Jobs: action.data}
    default:
      return state;
  }
}