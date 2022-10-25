export default function AvatarReducer(state={avatar: {}}, action){
	switch(action.type){
	case "AVATAR_RESPONSE_CHANGE":
		return {avatar: action.data.file}
	default:
		return state

	}

}
