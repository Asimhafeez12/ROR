const initial_state = {
  user_languages: []
}

export default function UserLanguagesReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_LANGUAGES':
      return {user_languages: action.data};
     default:
       return state;
  }
}

