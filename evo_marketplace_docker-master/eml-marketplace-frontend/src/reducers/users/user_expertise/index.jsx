const initial_state = {
  user_expertise: []
}

export default function UserExpertiseReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_EXPERTISE':
      return {user_expertise: action.data};
     default:
       return state;
  }
}

