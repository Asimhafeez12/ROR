const initialState = {
  certifications: []
}

export default function registerFLRCertification(state=initialState, action) {
  switch(action.type) {
    case 'APPEND_FLR_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.concat(action.data)
      }
    case 'REMOVE_FLR_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter(({title}) => title === action.data)
      }
    default:
      return state
  }
}
