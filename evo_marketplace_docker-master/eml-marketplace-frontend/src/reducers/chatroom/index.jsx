const initialState = {
	chatroom: null
}

export default function ChatroomReducer(state=initialState, action) {
	switch(action.type) {
		case "CHATROOM_CHANGE":
			return { chatroom: action.data }
		default:
			return state;
	}
}