export default function AvatarReducer(state={avatar: window.currentUser}, action){
	switch(action.type){
	case "AVATAR_RESPONSE_CHANGE":
		return {avatar: action.data.file} 
	default:
		return state

	}

}