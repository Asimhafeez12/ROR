import API from './../index';

class ReadMessages {
  static update(chatroom_id) {
    return API.put(`/api/v1/read_messages/${chatroom_id}.json`).catch(
      error => { return error; }
    );
  }
}

export default ReadMessages;