const initial_state = {
  user_badges: []
}

export default function UserBadgesReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_BADGES':
      return {user_badges: action.data};
     default:
       return state;
  }
}

