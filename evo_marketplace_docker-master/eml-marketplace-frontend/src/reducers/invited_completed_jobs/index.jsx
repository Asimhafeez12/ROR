const initial_state = {
  completed_jobs: []
};
export default function InvitedCompletedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_INVITED_COMPLETED_JOBS':
      return {completed_jobs: action.data};
    default:
      return state;
  }
}
