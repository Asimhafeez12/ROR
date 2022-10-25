import React, { Component } from 'react';
import { connect } from 'react-redux';

import chatUser1 from './../../../../images/chat-user.png';
import moment from 'moment';

class UserChatroom extends Component{

	render(){
		const { chatroom } = this.props;

		return(
			<div className="user-data-holder">
				<div className="user-image-holder">
					<img src={chatUser1} alt="User img" />
					<span className="online-status online"></span>
				</div>
				<div className="user-content">
					<div className="user-title">
						{<h3>{chatroom.user_full_name}</h3>}
{/*						<span className="msg-number">02</span>*/}
						<span className="time">{moment(chatroom.current_chatroom_last_message.created_at).fromNow()}</span>
					</div>	
{/*					<span className="msg-title">I need a chatbot engineer</span>*/}
					<span className="msg-detail">{chatroom.current_chatroom_last_message.body}</span>
				</div>
			</div>
			);
		}
	}


function mapStateToProps(state, ownProps) {
  return {
    chatroom: ownProps.chatroom,
  };
}


export default connect(mapStateToProps)(UserChatroom);

