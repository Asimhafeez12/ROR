const initial_state = {
  user_certificates: []
}

export default function UserCertificateReducer(state=initial_state, action) {
  switch(action.type) {
    case 'ADD_ALL_CERTIFICATE':
      return {
        ...state,
        user_certificates: state.user_certificates.concat(action.data)
      };
    case 'REMOVE_CERTIFICATE':
      return {user_certificates: action.data};

    case 'UPDATE_CERTIFICATE':
      return {
        ...state,
        user_certificates: state.user_certificates.map((certificate) => (
          certificate.id === action.data.id ? action.data : certificate
        ))
      }
    case 'FETCH_ALL_USER_CERTIFICATES':
      return {user_certificates: action.data};
     default:
       return state;
  }
}

