const initial_state = {
  openned_jobs: []
}
export default function InvitedOpenJobsReducer(state=initial_state, action){
  switch(action.type) {
    case 'LOAD_ALL_OPENNED_INVITED_JOBS':
      return { openned_jobs: action.data };
    default:
      return state;
  }
}
