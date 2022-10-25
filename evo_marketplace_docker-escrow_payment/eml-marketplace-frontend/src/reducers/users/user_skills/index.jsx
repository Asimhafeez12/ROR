const initial_state = {
  user_skills: []
}

export default function UserSkillsReducer(state=initial_state, action) {
  switch(action.type) {
    case 'FETCH_ALL_USER_SKILLS':
      return {user_skills: action.data};
     default:
       return state;
  }
}

