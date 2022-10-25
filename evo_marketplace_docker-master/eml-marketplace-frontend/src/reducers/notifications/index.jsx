const initialState = {
  notifications: [],
  unread_counts: 0
}

export default function NotificationsReducers(state= initialState, action) {
  switch(action.type) {
    case "FETCH_USER_NOTIFICATIONS":
      return action.data
    case "FETCH_ALL_USER_NOTIFICATIONS":
      return action.data
     default:
      return state
  }
}
