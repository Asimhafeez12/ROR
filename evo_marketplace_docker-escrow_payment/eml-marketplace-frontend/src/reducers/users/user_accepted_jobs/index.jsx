const initial_state = {
  user_accepted_jobs: []
}

export default function UserAcceptedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_ACCEPTED_JOBS':
      return {user_accepted_jobs: action.data};
     default:
       return state;
  }
}
