import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import ClientImage from './../../../../images/client_default.png';
import FreelancerImage from './../../../../images/freelancer_default.png';

class UserChatroom extends Component{

	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom
		}
	}

	render(){
		return(
			<div className="user-data-holder">
				<div className="user-image-holder">
                    {!!this.state.chatroom.user.avatar_url ?
                        "" :
				  		<React.Fragment>
				  			{this.state.chatroom.user._r.includes("freelancer") ?
				  				<img src={FreelancerImage} alt="User img" /> : ""
				  			}
				  			{this.state.chatroom.user._r.includes("client") ?
				  				<img src={ClientImage} alt="User img" /> : ""
				  			}
				  		</React.Fragment>
                    }
					<span className="online-status online"></span>
				</div>
				<div className="user-content">
					<div className="user-title">
						{<h3>{this.state.chatroom.user.full_name}</h3>}
						{this.state.chatroom.unread_messages_for_current_chatroom > 0 ?
							<span className="msg-number">{this.state.chatroom.unread_messages_for_current_chatroom}</span>
						: "" }
						<span className="time">{moment(this.state.chatroom.current_chatroom_last_message.created_at).fromNow()}</span>
					</div>	
					<span className="msg-title">{this.state.chatroom.chatroom_job_title}</span>
					<span className="msg-detail">{this.state.chatroom.current_chatroom_last_message.body}</span>
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

