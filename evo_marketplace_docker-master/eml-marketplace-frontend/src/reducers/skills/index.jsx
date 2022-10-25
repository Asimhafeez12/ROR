const initialState = {
  skills: [],
}

export default function SkillsReducer(state=initialState, action) {
  switch(action.type) {
    case 'FETCH_ALL_SKILLS_LIST':
      return {skills: action.data}
    default:
      return state;
  }
}
