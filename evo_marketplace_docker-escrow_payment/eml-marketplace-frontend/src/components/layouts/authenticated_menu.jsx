import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Menu, Dropdown, Icon, Badge } from 'antd';
//import NotificationsMenu from '../notifications';
import { ActionCable } from 'react-actioncable-provider';
import * as notificationActions from './../../actions/notifications';
import * as chatroomActions from './../../actions/user_chatrooms';
import * as messagereadActions from './../../actions/read_messages';
import * as unreadMessagesActions from './../../actions/unread_messages';
import * as mcActions from './../../actions/my_chatrooms';
import Defender from './../../helpers/defender';
import moment from 'moment';
import wallet_icon from '../../images/ic_wallet_02.png';
import message_icon from '../../images/message-icon.png';
import notification_icon from '../../images/notification-icon.png';
import ClientImage from '../../images/client_default.png';
import FreelancerImage from '../../images/freelancer_default.png';


class AuthenticatedMenu extends Component {

  mark_messages_as_read(obj_chatroom_id, e) {
  	this.props.markMessagesAsRead(obj_chatroom_id);
  	this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
  	this.props.fetchMyChatrooms();
  }

  mark_notification_as_read(obj_notification_id, e) {
  	this.props.updateNotificationStatus(obj_notification_id);
  }

  onReceived(user_notification) {
    if(user_notification.message.action) {
      message.info(user_notification.message.message);
      let actions = {
        notifications: () => ( this.props.fetchNotifications() ),
      };
      actions[user_notification.message.action.split('.')[0]]();
    } else {
      const { chatrooms } = this.props.chatroom_reducer;
      const { message } = user_notification;
      let record = chatrooms.find((elm) => elm.chatroom_id === message.chatroom_id);
      // TODO: this should handle on server side if chatbox is openend don't trigger again
      if (!record) {
        this.props.openChatroom({chatroom_id: user_notification.message.chatroom_id, full_name: user_notification.message.user_full_name, user_id: user_notification.message.user_id});
      }
    }
  }

  componentWillMount() {
	this.props.fetchNotifications();
	this.props.fetchMyChatrooms();
	this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
  }
  

  menu(){
    return (
      <Menu className="right-dropdown-menu">
		<Menu.Item><a href={'/profile/'+ Defender.currentUser().id}><Icon type="user" theme="outlined" /><span>Profile</span></a></Menu.Item>
        {Defender.currentUser()._r.includes("client") ?
			<Menu.Item><a href="/client/settings"><Icon type="setting" theme="outlined" /><span>Settings</span></a></Menu.Item>
        : 
        	<Menu.Item><a href="/freelancer/settings"><Icon type="setting" theme="outlined" /><span>Settings</span></a></Menu.Item>
        }
        { Defender.currentUser()._r.includes("freelancer") ?
			<Menu.Item><a href=""><img className="available-earnings" src={wallet_icon} alt="User img" /><span>Available Earnings</span></a></Menu.Item>
		: "" }
		<Menu.Item>
			<a onClick={this.triggerHandler} className="ant-dropdown-link" href="">
				<Icon className="question-icon" type="question-circle-o" />
				<span>Help</span>
			</a>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item><a href="" onClick={Defender.logout}><Icon type="logout" theme="outlined" /><span>Sign Out</span></a></Menu.Item>
      </Menu>
    );
  }


  messages_list(chatrooms){
	return (
		<React.Fragment>
			{chatrooms && chatrooms.length > 0 ?
				<Menu className="messages-dropdown-menu right-dropdown-menu">
					<Menu.Item className="messages-heading">
						<h3>Messages</h3>
					</Menu.Item>
					<Menu.Divider className="divider-top" />
					{ chatrooms && chatrooms[0] !== undefined && chatrooms.map((chatroom, index) => (
						<Menu.Item className="messages-listing" key={index} onClick={ () => ( this.props.openChatroom({chatroom_id: chatroom.current_chatroom_id, user_id: chatroom.user.id, full_name: chatroom.user.full_name, job_id: chatroom.chatroom_job_id, job_title: chatroom.chatroom_job_title }) ) } >
							<a href="javascript:;" onClick={this.mark_messages_as_read.bind(this,chatroom.current_chatroom_id)}>
								<div className="list-content-holder">
									<div className="user-image-holder">
                                        {!!chatroom.user.avatar_url ?
                                            "" :
									  		<React.Fragment>
									  			{chatroom.user._r.includes("freelancer") ?
									  				<img className="available-earnings" src={FreelancerImage} alt="User img" /> : ""
									  			}
									  			{chatroom.user._r.includes("client") ?
									  				<img className="available-earnings" src={ClientImage} alt="User img" /> : ""
									  			}
									  		</React.Fragment>
                                        }
									</div>
									<div className="user-content-holder">
										<div className="notify-heading">
											<h3 className="user-name">
												<span className="user-name-text">{chatroom.user.full_name}</span>
												{chatroom.unread_messages_for_current_chatroom > 0 ?
													<span className="msg-number">{chatroom.unread_messages_for_current_chatroom}</span>
												: "" }
											</h3>
										</div>
										<h4 className="user-message-title">{chatroom.chatroom_job_title}</h4>
										<p className="user-message">{chatroom.current_chatroom_last_message.body}</p>
									</div>
								</div>
								<div className="time-holder">{moment(chatroom.current_chatroom_last_message.created_at).fromNow()}</div>
							</a>
						</Menu.Item>
					))}
					<Menu.Divider className="divider-bottom" />
					<Menu.Item className="view-messages-btn"><a href="/messages">View all Messages</a></Menu.Item>
				</Menu>
			: 
			<div className="no-messages-dropdown">
				<div className="no-messages-heading">
					<h1>Messages</h1>
				</div>
				<div className="no-messages-body">
					<div className="image-holder">
						<img src={message_icon} alt="Message" />
					</div>
					<div className="content">
						<h2>No Messages To Show</h2>
						<p>Hire any freelancer for your jobs to start conversation.</p>
					</div>
				</div>
			</div>
			}
		</React.Fragment>

	);
  }
  questions_list(){
	return (
		<Menu className="question-dropdown-menu right-dropdown-menu">
			<Menu.Item className="question-heading">
				<h3>Help</h3>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item>
				<a href="">
					<p className="question-detail">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</p>
				</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item className="view-question-btn"><a href="">Talk To Suppost Team</a></Menu.Item>
		</Menu>
	);
  }

	notifications_list(notifications){
		return (
			<React.Fragment>
				{notifications && notifications.length > 0 ?
					<Menu className="notification-dropdown-menu right-dropdown-menu">
						<Menu.Item className="notifications-heading">
							<h3>Notifications</h3>
							{Defender.currentUser()._r.includes("client") ?
								<a className="setting-icon" href="/client/settings"><Icon style={{fontSize:'16px'}} type="setting" theme="outlined" /></a>
							: <a className="setting-icon" href="/freelancer/settings"><Icon style={{fontSize:'16px'}} type="setting" theme="outlined" /></a>
							}
						</Menu.Item>
						<Menu.Divider className="divider-top" />
						{ notifications && notifications.map((val, index) => (
							<Menu.Item className="notification-listing" key={index}>
								{val.action.includes("user") && val.notifable ? 
									<a href={'/profile/'+ Defender.currentUser().id}>
									<div className="list-content-holder">{val.message}</div>
									<div className="time-holder">{moment(val.created_at).fromNow()}</div>
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
									<div className="list-content-holder">{val.message}</div>
									<div className="time-holder">{moment(val.created_at).fromNow()}</div>
									</a>
								: "" }
								{val.action.includes("job") && val.action === "notifications.job.rating" && Defender.currentUser()._r.includes("freelancer") && val.notifable ?
									<a href={'/add_review_rating/' + val.notifable.id}>
									<div className="list-content-holder">{val.message}</div>
									<div className="time-holder">{moment(val.created_at).fromNow()}</div>
									</a>
								: "" }
								{val.action.includes("job") && val.action === "notifications.job.recommended" && val.notifable ?
									<a href={'/job_details/' + val.notifable.id}>
									<div className="list-content-holder">{val.message}</div>
									<div className="time-holder">{moment(val.created_at).fromNow()}</div>
									</a>
								: "" }
							</Menu.Item>
			            ))}
						<Menu.Divider className="divider-bottom" />
						<Menu.Item className="view-notifications-btn"><a href="/all_notifications">View all notifications</a></Menu.Item>
					</Menu>
					:
					<div className="no-notification-dropdown">
						<div className="no-notification-heading">
							<h1>Notification</h1>
						</div>
						<div className="no-notification-body">
							<div className="image-holder">
								<img src={notification_icon} alt="Notification" />
							</div>
							<div className="content">
								<h2>No Notifications To Show</h2>
								<p>You haven't performed any activity yet.</p>
							</div>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}

	triggerHandler = () => {
		var button = document.getElementById("help-dropdown")
		button.click()
	}

  render() {
	const { currentUser } = this.props.auth;
	const { unread_counts } = this.props.notifications_reducer;
	const { notifications } = this.props.notifications_reducer;
	const { chatrooms } = this.props.my_chatrooms_reducer;
	const { total_unread_messages } = this.props.unread_messages_reducer;
    
	return (
		<div className="nav-holder">
			<ActionCable ref='notificationsChannel'
		  channel={{channel: 'NotificationsChannel', room: currentUser.id }}
		  onReceived={this.onReceived.bind(this)} />
			<nav className="main-navigation">
			  <Menu>
				<Menu.Item><a href="/"><Icon  style={{ fontSize:'18px' }} type="home" theme="outlined" /><span>Home</span></a></Menu.Item>
				<Menu.Item><a href="/jobs"><Icon style={{ fontSize:'18px' }} type="solution" theme="outlined" /><span>Jobs</span></a></Menu.Item>
				{Defender.currentUser()._r.includes("freelancer") ?
					<Menu.Item><a href={"/profile/" + Defender.currentUser().id}><Icon style={{ fontSize:'18px' }} type="user" theme="outlined" /><span>Profile</span></a></Menu.Item>
				: "" }
			  </Menu>
			</nav>

			<nav className="profile-menu">
			  <Menu style={{ overflow: 'visible' }}>
				<Menu.Item>
				  <Dropdown placement="bottomLeft" style={{ top:'100', bottom:'100' }} overlay={this.messages_list(chatrooms)} trigger={['click']}>
					<a className="ant-dropdown-link" href="">
						<Icon style={{ fontSize:'22px' }} type="message" />
						{total_unread_messages !== false && total_unread_messages > 0 ? 
							<Badge className="unread-msg" count={total_unread_messages}></Badge>
						: "" }
					</a>
				  </Dropdown>
				</Menu.Item>
				<Menu.Item>
				  <Dropdown placement="bottomLeft" style={{ top:'100', bottom:'100' }} overlay={this.notifications_list(notifications)} trigger={['click']}>
					<a className="ant-dropdown-link" href="javascript:;" onClick={this.mark_notification_as_read.bind(this,1)}>
						<Icon style={{ fontSize:'22px' }} type="bell" />
						<Badge className="unread-msg" count={unread_counts}></Badge>
					</a>
				  </Dropdown>
				</Menu.Item>
				<Menu.Item className="help-dropdown">
				  <Dropdown placement="bottomRight" overlay={this.questions_list()} trigger={['click']}>
					<a id="help-dropdown" className="ant-dropdown-link" href="">&nbsp;</a>
				  </Dropdown>
				</Menu.Item>
				<Menu.Item className="user-profile-menu">
				  <Dropdown placement="bottomLeft" style={{ top:'100', bottom:'100' }} overlay={this.menu()} trigger={['click']}>
					<a className="ant-dropdown-link" href="">
					  <div className="my-image-holder">
					  	{!!Defender.currentUser().avatar_url ?
					  		"" :
					  		<React.Fragment>
					  			{Defender.currentUser()._r.includes("freelancer") ?
					  				<img src={FreelancerImage} alt="User img" /> : ""
					  			}
					  			{Defender.currentUser()._r.includes("client") ?
					  				<img src={ClientImage} alt="User img" /> : ""
					  			}
					  		</React.Fragment>
					  	}
					  </div>
					  <span className="profile-username">{currentUser.first_name}</span>
					</a>
				  </Dropdown>
				</Menu.Item>
			  </Menu>
			</nav>
			
			<div className="mobile-profile-menu">
			  <Dropdown placement="bottomRight" style={{ top:'100', bottom:'100' }} overlay={this.menu()} trigger={['click']}>
				<a className="ant-dropdown-link" href="">
				  <div className="my-image-holder">
				  	{Defender.currentUser()._r.includes("freelancer") ?
						<img src={FreelancerImage} alt="User img" />
					: 	<img src={ClientImage} alt="User img" />
					}
				  </div>
				</a>
			  </Dropdown>
			</div>
		</div>
	);
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    notifications_reducer: state.notifications_reducer,
    chatroom_reducer: state.userchatroom_reducer,
    my_chatrooms_reducer: state.my_chatrooms_reducer,
    unread_messages_reducer: state.unread_messages_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMyChatrooms: () => {
      return dispatch(mcActions.fetchMyChatrooms())
    },
	fetchNotifications: () => {
	  dispatch(notificationActions.fetchNotifications())
	},
	updateNotificationStatus: (notification_id) => {
	  dispatch(notificationActions.markNotification_as_read(notification_id))
	},
	markMessagesAsRead: (chatroom_id) => {
	  dispatch(messagereadActions.markChatMessagesAsRead(chatroom_id))
	},
	fetchUnreadMessagesCount: (user_id) => {
	  dispatch(unreadMessagesActions.fetch(user_id))
	},
	openChatroom: (data) => {
	  return dispatch(chatroomActions.openUserChatroom(data));
	}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedMenu);

