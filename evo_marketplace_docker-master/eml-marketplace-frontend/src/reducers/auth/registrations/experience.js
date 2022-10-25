const initialState = {
  experiences: []
}

export default function registerFLRExperience(state=initialState, action) {
  switch(action.type) {
    case 'APPEND_FLR_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.concat(action.data)
      }
    case 'REMOVE_FLR_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.filter(({title}) => title === action.data)
      }
    default:
      return state
  }
}
