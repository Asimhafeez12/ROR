import Defender from './../../helpers/defender';

export default function authReducer(state={currentUser: Defender.currentUser(), isAuthenticated: Defender.isAuthenticated()}, action){
  switch(action.type) {
  	case "FILE_RESPONSE_CHANGE":
  		return updateUserHash(state, action);
    default:
      return state;
  }
}

function updateUserHash(state, action){
	return state;
}

