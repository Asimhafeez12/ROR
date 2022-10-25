export default function registerReducer(state = {registerErrorMessage: null, registerUser: {}, success: false}, action) {
  switch(action.type) {
    case 'LOAD_REGISTER_USER':
      return { registerUser: action.data, success: true, registerErrorMessage: null }
    case 'ERROR_REGISTER_USER':
      return { success: false, registerUser: {}, registerErrorMessage: action.data.errors }
    default:
      return state;
  }
}
