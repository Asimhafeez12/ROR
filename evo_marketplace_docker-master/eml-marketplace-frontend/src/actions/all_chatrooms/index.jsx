import AllChatrooms from './../../api/all_chatrooms';

export function fetchAllChatrooms() {
  return function(dispatch) {
    return AllChatrooms.fetch_all().then(response => {
      dispatch(sendMyChatroomsStatus(response.data));
    })

  }
}

function sendMyChatroomsStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_MY_CHATROOMS", data };
  } else{
    return { type: "FETCH_ALL_CHATROOMS", all_chatrooms: data };
  }
}
