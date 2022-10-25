const initial_state = {
  messages: []
}

export default function ChatMessagesReducer(state=initial_state, action) {
  switch(action.type) {
    case 'LOAD_CHAT_MESSAGES':
      return {
        messages: action.data,
      }
    case 'APPEND_CHAT_MESSAGE':
      return {
        ...state,
        messages: state.messages.concat(action.data)
      };
    default:
      return state;
  }
}
