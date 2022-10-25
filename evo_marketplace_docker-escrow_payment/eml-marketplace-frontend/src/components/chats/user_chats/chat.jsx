import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon } from 'antd';
//import axios from 'axios';
import { ActionCable } from 'react-actioncable-provider';
import * as cmActions from './../../../actions/chat_messages';
import * as unreadMessagesActions from './../../../actions/unread_messages';
import * as mcActions from './../../../actions/my_chatrooms';
import Defender from './../../../helpers/defender';
import ClientImage from './../../../images/client_default.png';
import FreelancerImage from './../../../images/freelancer_default.png';
import API from './../../../api';
import moment from 'moment';

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom,
		}
	}

	componentWillMount(){
		this.props.fetchAllMessages(this.props.chatroom.chatroom_id);
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchMyChatrooms();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (this.state.chatroom.chatroom_id) {
				this.sendMessage({body: values.message});
			} else {
        
				API.post('/api/v1/user_chatrooms.json', {
						chatroom: {
							job_id: this.state.chatroom.job_id,
							user_chatrooms_attributes: [{
								user_id: this.state.chatroom.user_id,
							},
							{
								user_id: this.props.auth.currentUser.id,
							}],
							chatroom_messages_attributes: [{
								body: values.message,
								user_id: this.props.auth.currentUser.id
							}],
						}
					}).then((response) => {
						let { chatroom } = this.state;
						chatroom.chatroom_id = response.data.id;
						this.setState({
							chatroom: chatroom,
						});
						this.props.fetchAllMessages(response.data.id);
					});
			}
			this.props.form.resetFields();
			//this.props.fetchMyChatrooms();
		});
	}
	onRecieved(message) {
		this.props.addMessageToChat(JSON.parse(message.message));
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchMyChatrooms();
	}
	sendMessage(message) {
		this.refs.notificationsChannel.perform('send_message', message);
	}

	destoryWindow(){
			var element = document.getElementById("chat-window");
			element.parentNode.removeChild(element);
	}


	minimize(){
			//var min=1;
			var element = document.getElementById("chat-window");
			var findClass = document.getElementsByClassName("minimized").length;
	
			if(findClass){
				element.classList.remove("minimized");
			} else {
				element.classList.add("minimized");
			}
	}


	render(){
		const { getFieldDecorator } = this.props.form;
		const { messages } = this.props.chat_messages_reducer;
		//const { total_unread_messages } = this.props.unread_messages_reducer;
		return (
			<div id="chat-window" className='popup-box chat-popup'>
				{this.state.chatroom.chatroom_id ? <ActionCable
					ref='notificationsChannel'
					channel={{channel: 'ChatroomsChannel',
							chatroom_id: this.state.chatroom.chatroom_id,
							room: this.state.chatroom.chatroom_id}}
					onReceived={this.onRecieved.bind(this)} /> : ''}

					<div className="popup-header">
						<div className="popup-header-left">
							<span className="online-status online"></span>
							<h2><a href={'/profile/'+ this.state.chatroom.user_id}>{this.state.chatroom.full_name}</a></h2>
							<p><a href={'/job/'+ this.state.chatroom.job_id}>{this.state.chatroom.job_title}</a></p>
						</div>
						<div className="popup-header-right">
							<a id="minimize-btn" href="javascript:;" onClick={this.minimize.bind()}><Icon style={{ fontSize:'18px' }} type="minus" theme="outlined" /></a>
							<a id="exit-chat-window" href="javascript:;" onClick={this.destoryWindow.bind()} ><Icon style={{ fontSize:'18px' }} type="close" theme="outlined" /></a>
						</div>
					</div>

					<div className="popup-body">
			            { messages.map((message, index) => (
			              <div className="message-list-block" key={index}>
			                <div className="chat-user-image">
								{!!message.user_role ?
									<React.Fragment>
					                    {!!message.user_avatar_url ?
					                        "" :
									  		<React.Fragment>
									  			{message.user_role.includes("freelancer") ?
									  				<img src={FreelancerImage} className="payment-logo" alt="User img" /> : ""
									  			}
									  			{message.user_role.includes("client") ?
									  				<img src={ClientImage} className="payment-logo" alt="User img" /> : ""
									  			}
									  		</React.Fragment>
					                    }
									</React.Fragment>
									: 
									<React.Fragment>
					                    {!!message.user_avatar_url ?
					                        "" :
									  		<React.Fragment>
									  			{message.user__r.includes("freelancer") ?
									  				<img src={FreelancerImage} className="payment-logo" alt="User img" /> : ""
									  			}
									  			{message.user__r.includes("client") ?
									  				<img src={ClientImage} className="payment-logo" alt="User img" /> : ""
									  			}
									  		</React.Fragment>
					                    }
									</React.Fragment>
								}
			                </div>
			                <div className="chat-user-content">
			                  <ul>
			                    <li><h3>{message.body}</h3></li>
			                    <li><p>{moment(message.created_at).fromNow()}</p></li>
			                  </ul>
			                </div>
			              </div>
			            ))}
					</div>

					<div className="popup-bottom">
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<Form.Item>
								{ getFieldDecorator('message')(<Input placeholder="Say something and press enter ..." />) }
							</Form.Item>
							<Form.Item className="send-message-button">
								<Button type="primary" htmlType="submit">Submit</Button>
							</Form.Item>
						</Form>
					</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		chatroom: ownProps.chatroom,
		auth: state.auth,
		chat_messages_reducer: state.chat_messages_reducer,
		unread_messages_reducer: state.unread_messages_reducer
	}

}
function mapDispatchToProps(dispatch){
	return {
		fetchAllMessages: (chatroom_id) => {
			return dispatch(cmActions.loadChatMessages(chatroom_id));
		},
		addMessageToChat: (message) => {
			return dispatch(cmActions.addToMessages(message));
		},
		fetchUnreadMessagesCount: (user_id) => {
		  dispatch(unreadMessagesActions.fetch(user_id))
		},
	    fetchMyChatrooms: () => {
	      return dispatch(mcActions.fetchMyChatrooms())
	    }
	}
}
const wrappedMessageForm = Form.create()(Chat)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedMessageForm);
