const initialState = {
  personal_information: {},
}

export default function registerFLRPersonalInformation(state=initialState, action) {
  switch(action.type) {
    case 'UPDATE_FLR_PERSONAL_INFORMATION':
      return { personal_information: action.data }
    default:
      return state;
  }
}
