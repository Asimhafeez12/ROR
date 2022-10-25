const initial_state = {
  messages: []
}

export default function ReadMessagesReducer(state=initial_state, action) {
  switch(action.type) {
    case 'MARK_CHAT_MESSAGES_AS_READ':
      return {
        messages: action.data,
      }
    default:
      return state;
  }
}
