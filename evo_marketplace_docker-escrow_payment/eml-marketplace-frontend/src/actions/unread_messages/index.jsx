import UnreadMessages from './../../api/unread_messages';

export function fetch(user_id) {
  return function(dispatch) {
    return UnreadMessages.fetch(user_id).then((response) => {
      dispatch({type: 'TOTAL_UNREAD_MESSAGES', ...response})
    });
  }
}
