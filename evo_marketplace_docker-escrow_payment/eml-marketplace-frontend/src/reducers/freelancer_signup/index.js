const initialState = {
  registerFLErrorMessage: null,
  registerFLUser: {},
  success: false
};

export default function registerFLReducer(state=initialState, action) {
  switch(action.type) {
    case 'LOAD_FL_REGISTER':
      return { registerFLUser: action.data, success: true, registerFLErrorMessage: null }
    case 'ERROR_FL_REGSITER':
      return { success: false, registerFLUser: {}, registerFLErrorMessage: action.data.errors }
    default:
      return state;

  }
}

