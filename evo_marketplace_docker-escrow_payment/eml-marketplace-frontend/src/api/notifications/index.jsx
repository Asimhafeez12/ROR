import API from './../index';

export default class NotificationList {
  static fetch() {
    return API.get('/api/v1/notifications.json').catch(
      error => { return error; }
    );
  }

  static fetch_all() {
    return API.get('/api/v1/all_notifications.json').catch(
      error => { return error; }
    );
  }

  static update(notification_id) {
    return API.put(`/api/v1/notifications/${notification_id}.json`).catch(
      error => { return error; }
    );
  }
}
