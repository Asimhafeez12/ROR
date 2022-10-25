import API from '../../index';

class UserPortfolio {
  static post(data) {
    return API.post('/api/v1/user_portfolios.json', data);
  }

  static update(user_portfolio_id, data) {
    return API.put(`/api/v1/user_portfolios/${user_portfolio_id}.json`, data);
  }

  static remove(user_portfolio_id) {
    return API.delete(`/api/v1/user_portfolios/${user_portfolio_id}.json`);
  }
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_portfolios.json`);
  }
}

export default UserPortfolio
