import API from './../index';

class MyChatrooms {
  static fetch() {
    return API.get('/api/v1/my_chatrooms.json').catch(
      error => { return error; }
    );
  }
  static fetch_all() {
    return API.get('/api/v1/all_chatrooms.json').catch(
      error => { return error; }
    );
  }
}

export default MyChatrooms;
