import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import moment from 'moment';
import ClientImage from './../../../../images/client_default.png';
import FreelancerImage from './../../../../images/freelancer_default.png';

class UserChatroom extends Component{

	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom,
			loading: true,
		}
	}

	componentWillMount(){
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	}

	openChat(){
		if(document.querySelector('.open_chat_link')){
			document.body.classList.add('open-chat');
		}
	}

	render(){
		//const { chatroom } = this.props;

		return(
			<div className="user-data-holder">
				<Skeleton loading={this.state.loading} avatar={true} title={true} paragraph={true} active>
					<div className="user-image-holder">
	                    {!!this.state.chatroom.user.avatar_url ?
	                        <React.Fragment>
	                        	<img src={this.state.chatroom.user.avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
	                        </React.Fragment>  
	                        :
					  		<React.Fragment>
					  			{this.state.chatroom.user._r.includes("freelancer") ?
					  				<img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
					  			}
					  			{this.state.chatroom.user._r.includes("client") ?
					  				<img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
					  			}
					  		</React.Fragment>
	                    }
{/*						<span className="online-status online"></span>*/}
					</div>
					<div className="user-content">
						<div className="user-title">
							{<h3>{this.state.chatroom.user.first_name}</h3>}
							{this.state.chatroom.unread_messages_for_current_chatroom > 0 ?
								<span className="msg-number">{this.state.chatroom.unread_messages_for_current_chatroom}</span>
							: "" }
							<span className="time">{moment(this.state.chatroom.updated_at).fromNow()}</span>
						</div>	
						<span className="msg-title">{this.state.chatroom.chatroom_job_title}</span>
						{this.state.chatroom.current_chatroom_last_message.body ?
							<span className="msg-detail">{this.state.chatroom.current_chatroom_last_message.body}</span>
						: <p className="user-message">File attached</p>
						}
					</div>
				</Skeleton>
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


