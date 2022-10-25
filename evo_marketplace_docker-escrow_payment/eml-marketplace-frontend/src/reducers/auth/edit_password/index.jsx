export default function editPasswordReducer(state={editPasswordError: null, editResetPasswordObj: {}, success: false}, action) {
  switch(action.type) {
    case 'ERROR_EDIT_PASSWORD_IN':
      return { editResetPasswordObj: {}, success: false, editPasswordError: action.data }
    case 'EDIT_PASSWORD_SUCCESS':
      return { editResetPasswordObj: action.data, success: true }
    default:
      return state;
  }
}
