const initial_state = {
  active_jobs: []
};
export default function InvitedActiveJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_INVITED_ACTIVE_JOBS':
      return {active_jobs: action.data};
    default:
      return state;
  }
}
