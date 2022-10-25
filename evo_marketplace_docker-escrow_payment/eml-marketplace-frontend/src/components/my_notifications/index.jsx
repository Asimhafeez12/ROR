import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as nActions from './../../actions/notifications';
import moment from 'moment';
import Defender from './../../helpers/defender';
import { Icon } from 'antd';

class MyNotifications extends Component {

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
      <div className="notifications-list-block">
          <div className="notifications-holder">
              <h1><Icon type="bell" /><span>All Notifications</span></h1>
              <ul>
                  { notifications && notifications.map((val, index) => (
                    <li key={index}>
                      {val.action.includes("user") && val.notifable ? 
                        <a href={'/profile/'+ Defender.currentUser().id}>
                            <strong className="notifications-message-text">{val.message}</strong>
                            <span className="notifications-time-text">{moment(val.created_at).fromNow()}</span>
                        </a>
                      : "" }
                      {val.action.includes("user") && val.notifable === null ? 
                        <a href={'/'}>
                        <div className="list-content-holder">{val.message}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      {val.action.includes("job") && val.action !== "notifications.job.recommended" && val.action !== "notifications.job.rating" && val.notifable ?
                        <a href={'/job/' + val.notifable.id}>
                            <strong className="notifications-message-text">{val.message}</strong>
                            <span className="notifications-time-text">{moment(val.created_at).fromNow()}</span>
                        </a>
                      : "" }
                      {val.action.includes("job") && val.action === "notifications.job.rating" && Defender.currentUser()._r.includes("freelancer") && val.notifable ?
                        <a href={'/add_review_rating/' + val.notifable.id}>
                            <strong className="notifications-message-text">{val.message}</strong>
                            <span className="notifications-time-text">{moment(val.created_at).fromNow()}</span>
                        </a>
                      : "" }
                      {val.action.includes("job") && val.action === "notifications.job.recommended" && val.notifable ?
                        <a href={'/job_details/' + val.notifable.id}>
                            <strong className="notifications-message-text">{val.message}</strong>
                            <span className="notifications-time-text">{moment(val.created_at).fromNow()}</span>
                        </a>
                      : "" }
                    </li>
                  ))}
              </ul>
          </div>
      </div>
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
      return dispatch(nActions.fetchAllNotifications())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);
