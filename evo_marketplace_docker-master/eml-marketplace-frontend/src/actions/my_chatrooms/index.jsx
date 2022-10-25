import MyChatrooms from './../../api/my_chatrooms';

export function fetchMyChatrooms() {
  return function(dispatch) {
    return MyChatrooms.fetch().then(response => {
      dispatch(sendMyChatroomsStatus(response.data));
    })

  }
}

function sendMyChatroomsStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_MY_CHATROOMS", data };
  } else{
    return { type: "FETCH_MY_CHATROOMS", chatrooms: data };
  }
}
