export default function UnreadMessagesReducer(state={total_unread_messages: 0}, action) {
  switch(action.type) {
    case "TOTAL_UNREAD_MESSAGES":
      return action.data;
    default:
      return state
  }
}
