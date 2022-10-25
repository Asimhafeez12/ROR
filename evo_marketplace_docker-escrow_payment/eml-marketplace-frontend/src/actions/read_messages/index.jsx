import ReadMessages from './../../api/read_messages';

export function markChatMessagesAsRead(chatroom_id) {
  return function(dispatch) {
    return ReadMessages.update(chatroom_id).then((response) => {
      dispatch({type: 'MARK_CHAT_MESSAGES_AS_READ', ...response})
    });
  }
}
