export function update(data) {
	return function(dispatch) {
		return dispatch({type: "CHATROOM_CHANGE", data: data});
	}
}