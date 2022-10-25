const initial_state = {
  user_educations: []
}

export default function UserEducationReducer(state=initial_state, action) {
  switch(action.type) {
    case 'ADD_ALL_EDUCATION':
      return {
        ...state,
        user_educations: state.user_educations.concat(action.data)
      };
    case 'REMOVE_EDUCATION':
      return {user_educations: action.data};
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        user_educations: state.user_educations.map((education) => (
          education.id === action.data.id ? action.data : education
        ))
      }
    case 'FETCH_ALL_USER_EDUCATIONS':
        return {user_educations: action.data};
     default:
       return state;
  }
}

