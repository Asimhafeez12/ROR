import API from './../index';

class ChatMessages {
  static fetch(chatroom_id) {
    return API.get(`/api/v1/chatrooms/${chatroom_id}/messages.json`);
  }
  static update(chatroom_id) {
    return API.put(`/api/v1/read_messages/${chatroom_id}.json`).catch(
      error => { return error; }
    );
  }
}

export default ChatMessages;