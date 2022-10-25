import ChatMessages from './../../api/chat_messages';
export function addToMessages(data) {
  return function(dispatch){
    dispatch({type: 'APPEND_CHAT_MESSAGE', data: data});
  }
}

export function loadChatMessages(chatroom_id) {
  return function(dispatch) {
    return ChatMessages.fetch(chatroom_id).then((response) => {
      dispatch({type: 'LOAD_CHAT_MESSAGES', ...response})
    });
  }
}

export function markChatMessagesAsRead(chatroom_id) {
  return function(dispatch) {
    return ChatMessages.update(chatroom_id).then((response) => {
      dispatch({type: 'MARK_CHAT_MESSAGES_AS_READ', ...response})
    });
  }
}
