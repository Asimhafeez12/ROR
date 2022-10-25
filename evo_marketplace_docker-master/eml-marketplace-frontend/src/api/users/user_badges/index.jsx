import API from '../../index';

class UserBadges {
  static fetch(user_id) {
    return API.get(`/api/v1/users/${user_id}/user_badges.json`);
  }
}

export default UserBadges
