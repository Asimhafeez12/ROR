export function openUserChatroom(chatroom_obj) {
  return function(dispatch) {
    dispatch({type: 'OPEN_USER_CHATROOM', data: chatroom_obj});
  }
}

