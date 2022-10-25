

export function updateUserPhoto(data) {
	return function(dispatch) {
		return dispatch(loadUserPhoto(data));
	}
}

export function loadUserPhoto(data) {
    return { type: 'FILE_RESPONSE_CHANGE', data }
  
}
