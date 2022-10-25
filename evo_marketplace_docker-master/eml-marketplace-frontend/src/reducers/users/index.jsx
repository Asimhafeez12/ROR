export default function userViewReducer(state={user: {}}, action){
  switch(action.type) {
    case 'FETCH_VIEW_USER':
      return { user: action.data };
    case 'UPDATE_USER':
      return { user: action.data };
    case 'UPDATE_USER_PASSWORD':
      return { user: action.data };
    default:
      return state;
  }
}
