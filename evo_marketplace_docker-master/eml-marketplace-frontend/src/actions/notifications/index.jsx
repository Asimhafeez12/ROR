import NotificationsList from './../../api/notifications';

export function fetchNotifications(){
  return function(dispatch) {
    return NotificationsList.fetch().then( response => {
      dispatch({type: 'FETCH_USER_NOTIFICATIONS', ...response});
    })
  }
}

export function fetchAllNotifications(){
  return function(dispatch) {
    return NotificationsList.fetch_all().then( response => {
      dispatch({type: 'FETCH_ALL_USER_NOTIFICATIONS', ...response});
    })
  }
}

export function markNotification_as_read(notification_id){
  return function(dispatch) {
    return NotificationsList.update(notification_id).then( response => {
      dispatch({type: 'FETCH_USER_NOTIFICATIONS', ...response});
    })
  }
}
