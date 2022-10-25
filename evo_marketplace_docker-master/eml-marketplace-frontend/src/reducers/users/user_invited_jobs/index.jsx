const initial_state = {
  user_invited_jobs: []
}

export default function UserInvitedJobsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_INVITED_JOBS':
      return {user_invited_jobs: action.data};
     default:
       return state;
  }
}

