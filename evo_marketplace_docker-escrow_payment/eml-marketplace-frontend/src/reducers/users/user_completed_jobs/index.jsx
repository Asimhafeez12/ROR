const initial_state = {
  user_completed_jobs: []
}

export default function UserCompletedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_COMPLETED_JOBS':
      return {user_completed_jobs: action.data};
     default:
       return state;
  }
}

