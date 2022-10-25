import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as nActions from './../../actions/notifications';
import moment from 'moment';
import Defender from './../../helpers/defender';
import { Icon } from 'antd';

class MyNotifications extends Component {

  state = {
    messages: [],
    loading: true,
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
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);

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
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      { val.action.includes("user") && val.notifable === null && Defender.currentUser()._r.includes("client") ? 
                        <a href={'/client'}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      { val.action.includes("user") && val.notifable === null && Defender.currentUser()._r.includes("freelancer") ? 
                        <a href={'/freelancer'}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      {  val.action.includes("job") && val.action !== "notifications.job.recommended" && val.action !== "notifications.job.rating" && val.action !== "notifications.job.received" && val.notifable && val.action.indexOf("escrow") < 0 ?
                        <a href={'/job/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : ""  }
                      { val.action.includes("job") && val.action === "notifications.job.rating" && Defender.currentUser()._r.includes("freelancer") && val.notifable && val.notifable && val.action.indexOf("escrow") < 0 ?
                        <a href={'/add_review_rating/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : ""  }
                      { val.action.includes("job") && val.action === "notifications.job.rating" && Defender.currentUser()._r.includes("client") && val.notifable && val.notifable && val.action.indexOf("escrow") < 0 ?
                        <a href={'/job/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : ""  }
                      { val.action.includes("job") && val.action === "notifications.job.received" && val.notifable && val.notifable && val.action.indexOf("escrow") < 0 ?
                        <a href={'/job_details/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      { val.action.includes("job") && val.action === "notifications.job.recommended" && val.notifable && Defender.currentUser()._r.includes("freelancer") && val.notifable && val.action.indexOf("escrow") < 0 ?
                        <a href={'/job_details/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
                        </a>
                      : "" }
                      { val.action.includes("escrow") ? 
                        <a href={'/job/' + val.notifable.id}>
                        <div className="list-content-holder">{val.message.toString()}</div>
                        <div className="time-holder">{moment(val.created_at).fromNow()}</div>
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
