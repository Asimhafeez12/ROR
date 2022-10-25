import API from './../index';

class AllChatrooms {
  static fetch_all() {
    return API.get('/api/v1/all_chatrooms.json').catch(
      error => { return error; }
    );
  }
}

export default AllChatrooms;
