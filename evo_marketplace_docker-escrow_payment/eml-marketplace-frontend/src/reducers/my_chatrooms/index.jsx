export default function MyChatroomsReducer(state={chatrooms: []}, action) {
  switch(action.type) {
    case "FETCH_MY_CHATROOMS":
      return action;
    default:
      return state
  }
}
