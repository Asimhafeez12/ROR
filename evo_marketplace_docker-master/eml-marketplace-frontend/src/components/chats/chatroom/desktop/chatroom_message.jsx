import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import ClientImage from './../../../../images/client_default.png';
import FreelancerImage from './../../../../images/freelancer_default.png';
import * as cmActions from './../../../../actions/chat_messages';
import moment from 'moment';
import ThumbnailPreviewer from './../../../utils/thumbnail_previewer';

class ChatroomMessage extends Component{

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
						<Skeleton loading={this.state.loading} avatar={true} title={true} paragraph={true} active>
							<div className="user-data-holder">
								{!!message.user_role ?
									<div className="user-image-holder">
					                    {!!message.user_avatar_url ?
			                                <React.Fragment>
			                                	<img src={message.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                                </React.Fragment>  
			                                :
									  		<React.Fragment>
									  			{message.user_role.includes("freelancer") ?
									  				<img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  			{message.user_role.includes("client") ?
									  				<img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  		</React.Fragment>
					                    }
										{/*<span className="online-status online"></span>*/}
									</div>
									: 
									<div className="user-image-holder">
					                    {!!message.user_avatar_url ?
			                                <React.Fragment>
			                                	<img src={message.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                                </React.Fragment>  
			                                :
									  		<React.Fragment>
									  			{message.user__r.includes("freelancer") ?
									  				<img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  			{message.user__r.includes("client") ?
									  				<img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  		</React.Fragment>
					                    }
										{/*<span className="online-status online"></span>*/}
									</div>
								}
								<div className="user-content">
									<div className="user-title">
										<h3>{message.user_full_name}</h3>
									</div>	
									<span className="msg-detail">{message.body}</span>
	                          		<span className="time">{moment(message.created_at).fromNow()}</span>
			                        { message && message.chat_message_files && message.chat_message_files.length ?
			                            <div className="thumbnail-holder">
				                            { message.chat_message_files.map(({file}, index) =>
				                            	<a key={index} target="_blank" href={file.url}>
				                            		{file.url.indexOf("png") > 0 || file.url.indexOf("jpg") > 0 || file.url.indexOf("jpeg") > 0 ?
				                            			<ThumbnailPreviewer key={index} file={file.medium.url} />
				                            		: 
				                            		<React.Fragment>{file.url.replace(/^.*[\\\/]/, '')}</React.Fragment>
				                            		}
				                            	</a>
				                            ) }
			                            </div>
	                        			: null 
	                      			}

								</div>
							</div>
						</Skeleton>
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

