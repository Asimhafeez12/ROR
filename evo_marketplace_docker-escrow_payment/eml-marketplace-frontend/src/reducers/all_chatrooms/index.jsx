export default function AllChatroomsReducer(state={all_chatrooms: []}, action) {
  switch(action.type) {
    case "FETCH_ALL_CHATROOMS":
      return action;
    default:
      return state
  }
}
