import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as nActions from './../../actions/notifications';

class NotificationsMenu extends Component {

  state = {
    messages: []
  }

  onReceived (message) {
    this.setState({
      messages: [
        ...this.state.messages,
        message
      ]
    })
  }
  
  componentWillMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { notifications } = this.props.notifications_reducer;
    return (
      <ul>
          {notifications.map((notification) =>
            <li key={notification.id}>{notification.message}</li>
          )}
      </ul>
   )
  }
}


function mapStateToProps(state) {
  return {
    notifications_reducer: state.notifications_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => {
      return dispatch(nActions.fetchNotifications())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsMenu);
