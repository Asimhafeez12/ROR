import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientImage from './../../../../images/client_default.png';
import FreelancerImage from './../../../../images/freelancer_default.png';
import * as cmActions from './../../../../actions/chat_messages';
import moment from 'moment';

class ChatroomMessage extends Component{


	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom
		}
	}


	componentWillMount(){
		this.props.fetchAllMessages(this.props.chatroom.current_chatroom_id);
	}
	componentDidMount() {
		this.props.setActiveTab(this);
	}
	refreshMesages = () => {
		this.props.fetchAllMessages(this.props.chatroom.current_chatroom_id);	
	}
	render(){
		const { messages } = this.props.chat_messages_reducer;
		return(
			<React.Fragment>
				{ messages && messages.map((message, index) => (
					<li key={index}>
						<div className="user-data-holder">
							{!!message.user_role ?
								<div className="user-image-holder">
				                    {!!message.user_avatar_url ?
				                        "" :
								  		<React.Fragment>
								  			{message.user_role.includes("freelancer") ?
								  				<img src={FreelancerImage} alt="User img" /> : ""
								  			}
								  			{message.user_role.includes("client") ?
								  				<img src={ClientImage} alt="User img" /> : ""
								  			}
								  		</React.Fragment>
				                    }
									<span className="online-status online"></span>
								</div>
								: 
								<div className="user-image-holder">
				                    {!!message.user_avatar_url ?
				                        "" :
								  		<React.Fragment>
								  			{message.user__r.includes("freelancer") ?
								  				<img src={FreelancerImage} alt="User img" /> : ""
								  			}
								  			{message.user__r.includes("client") ?
								  				<img src={ClientImage} alt="User img" /> : ""
								  			}
								  		</React.Fragment>
				                    }
									<span className="online-status online"></span>
								</div>
							}
							<div className="user-content">
								<div className="user-title">
									<h3>{message.user_full_name}</h3>
									<span className="time">{moment(message.created_at).fromNow()}</span>
								</div>	
								<span className="msg-detail">{message.body}</span>
							</div>
						</div>
					</li>
				))}
			</React.Fragment>
			);
		}
	}


function mapStateToProps(state, ownProps) {
  return {
    chatroom: ownProps.chatroom,
    chat_messages_reducer: state.chat_messages_reducer,
    setActiveTab: ownProps.setActiveTab
  };
}

function mapDispatchToProps(dispatch){
	return {
		fetchAllMessages: (chatroom_id) => {
			return dispatch(cmActions.loadChatMessages(chatroom_id));
		},
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatroomMessage);

