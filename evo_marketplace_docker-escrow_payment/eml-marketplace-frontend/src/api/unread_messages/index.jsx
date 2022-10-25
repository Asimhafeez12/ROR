import API from './../index';

class UnreadMessages {
  static fetch(user_id) {
    return API.get(`/api/v1/unread_messages/${user_id}.json`).catch(
      error => { return error; }
    );
  }
}

export default UnreadMessages;