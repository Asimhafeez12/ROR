import UserBadges from './../../../api/users/user_badges';


export function fetch(user_id) {
  return function(dispatch) {
    return UserBadges.fetch(user_id).then((res) => (
      dispatch({type: 'FETCH_ALL_USER_BADGES', ...res})
    ));
  }
}


