const initial_state = {
  user_billings: []
}

export default function UserBillingReducer(state=initial_state, action) {
  switch(action.type) {
    case 'ADD_USER_BILLING':
      return {
        ...state,
        user_billings: state.user_billings.concat(action.data)
      };
    case 'FETCH_USER_BILLING':
      return {user_billings: action.data};
     default:
       return state;
  }
}

