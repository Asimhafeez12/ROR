import UserPortfolio from './../../../api/users/user_portfolios';

export function add(data) {
  return function(dispatch) {
    return UserPortfolio.post(data).then((res) => (
      dispatch({type: 'ADD_ALL_PORTFOLIO', ...res})
    ))
  }
}

export function update(user_portfolio_id, data) {
  return function(dispatch) {
    return UserPortfolio.update(user_portfolio_id, data).then((res) => (
      dispatch({ type: 'UPDATE_PORTFOLIO', ...res})
    ))
  }
}

export function remove(user_portfolio_id) {
  return function(dispatch) {
    return UserPortfolio.remove(user_portfolio_id).then((res) => (
      dispatch({ type: 'REMOVE_PORTFOLIO', ...res})
    ))
  }
}

export function fetch(user_id) {
  return function(dispatch) {
    return UserPortfolio.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_PORTFOLIOS', ...res})
    ));
  }
}

