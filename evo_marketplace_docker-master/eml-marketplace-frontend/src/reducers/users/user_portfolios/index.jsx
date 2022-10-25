const initial_state = {
  user_portfolios: []
}

export default function UserPortfolioReducer(state=initial_state, action) {
  switch(action.type) {
    case 'ADD_ALL_PORTFOLIO':
      return {
        ...state,
        user_portfolios: state.user_portfolios.concat(action.data)
      };
    case 'REMOVE_PORTFOLIO':
      return {user_portfolios: action.data};

    case 'UPDATE_PORTFOLIO':
      return {
        ...state,
        user_portfolios: state.user_portfolios.map((portfolio) => (
          portfolio.id === action.data.id ? action.data : portfolio
        ))
      }
    case 'FETCH_ALL_USER_PORTFOLIOS':
      return {user_portfolios: action.data};
     default:
       return state;
  }
}

