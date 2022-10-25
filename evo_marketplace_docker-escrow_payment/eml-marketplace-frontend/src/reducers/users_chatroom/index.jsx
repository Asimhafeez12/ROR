const initial_state = {
  chatrooms: []
}

export default function UsersChatroomReducer(state=initial_state, action){
  switch(action.type){
    case 'OPEN_USER_CHATROOM':
      return {
        ...state,
        chatrooms: state.chatrooms.concat(action.data)
      }
    default:
      return state
  }
}
