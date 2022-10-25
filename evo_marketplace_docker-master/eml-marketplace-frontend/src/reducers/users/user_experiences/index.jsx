const initial_state = {
  user_experiences: []
}

export default function UserExperienceReducer(state=initial_state, action) {
  switch(action.type) {
    case 'ADD_ALL_EXPERIENCE':
      return {
        ...state,
        user_experiences: state.user_experiences.concat(action.data)
      };
    case 'REMOVE_EXPERIENCE':
      return {user_experiences: action.data};
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        user_experiences: state.user_experiences.map((experience) => (
          experience.id === action.data.id ? action.data : experience
        ))
      }
    case 'FETCH_ALL_USER_EXPERIENCES':
      return {user_experiences: action.data};
     default:
       return state;
  }
}

