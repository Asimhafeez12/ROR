import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Dropdown, Input, Menu, Upload, message, Form, Button } from 'antd';

import ClientImage from './../../../../images/client_default.png';
import FreelancerImage from './../../../../images/freelancer_default.png';
import * as cmActions from './../../../../actions/chat_messages';
import * as messagereadActions from './../../../../actions/read_messages';
import * as unreadMessagesActions from './../../../../actions/unread_messages';
import * as acActions from './../../../../actions/all_chatrooms';
import moment from 'moment';
import Defender from './../../../../helpers/defender';
import API from './../../../../api';
import { ActionCable } from 'react-actioncable-provider';
import ThumbnailPreviewer from './../../../utils/thumbnail_previewer';

const FormItem = Form.Item;
document.body.classList.add('no-files-uploaded');


class ChatroomMessage extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
      		fileList: [],
      		saveFileList: [],
			text: "",
		}
	}


	componentWillMount(){
		// setTimeout(() => {
		// 	this.setState({ loading: false });
		// }, 1000);
		this.props.fetchAllMessages(this.props.chatroom.current_chatroom_id);	
	}

	componentDidMount() {
		//this.props.setActiveTab(this);
		this.props.fetchAllMessages(this.props.chatroom.current_chatroom_id);			
	}

	refreshMesages = () => {
		this.props.fetchAllMessages(this.props.chatroom.current_chatroom_id);		
	}

	handleChange = (e) => {
		this.setState({ text: e.target.value })
	}

	onArshad = (e) => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	closeChat(){
		if(document.querySelector('.open_chat_link')){
			document.body.classList.remove('open-chat');
		}
	}

	checkIfEmailInString(text) { 
	    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
	    return re.test(text);
	}

	checkIfPhoneInString(text) { 
	    var re = /(^|\D)\d{8}($|\D)/;
	    return re.test(text);
	}

	checkIfDomainExists(text){
		if (text.toLowerCase().indexOf("gmail") > 0 || text.toLowerCase().indexOf("yahoo") > 0 || text.toLowerCase().indexOf("live") > 0 || text.toLowerCase().indexOf("hotmail") > 0 ){
			return false;
		}
		else{
			return true;
		}
	}

	handleSubmit(chatroom, e) {
		e.preventDefault();
		const that = this;
		this.props.form.validateFields((err, values) => {
			if ((values.message !== "" && values.message !== undefined) || (this.state.saveFileList.length)){
				if ((values.message !== "" && values.message !== undefined && that.checkIfEmailInString(values.message) === false && that.checkIfPhoneInString(values.message) === false && that.checkIfDomainExists(values.message) === true) || this.state.saveFileList.length){
					if (chatroom.current_chatroom_id) {
				        let data = {}
				        data["body"] = values.message
				        if (this.state.saveFileList.length)
				          data["chat_message_files_attributes"] = this.state.saveFileList;
				        this.setState({
				          fileList: [],
				          saveFileList: [],
				        })
						this.sendMessage(data);
					} else {
		        
						API.post('/api/v1/user_chatrooms.json', {
								chatroom: {
									user_chatrooms_attributes: [{
										user_id: chatroom.user_id,
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
				}
				else{
					message.error('Message not allowed');
				}
			}
			else{
				message.error('Empty message not allowed');
			}
		});
	}

	onRecieved(message) {
		this.props.addMessageToChat(JSON.parse(message.message));
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchAllChatrooms();
	}
	sendMessage(message) {
		this.refs.notificationsChannel.perform('send_message', message);
	}

	render(){
		const { messages } = this.props.chat_messages_reducer;
		const { getFieldDecorator } = this.props.form;
	    const _that = this;
	    const props = {
	      name: 'tmp_file',
	      action: `${process.env.REACT_APP_API_URL}/tmp_fileuploader`,
	      fileList: this.state.fileList,
	      beforeUpload(info){
	        // const extension = info.name.split('.').pop();
	        // if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'pdf' || extension === 'zip' || extension === 'txt'){
	        //   return true;
	        // }
	        // else{
	        //   message.error('File type not allowed');
	        //   return false;
	        // }
	      },
	      onChange(info) {
			document.body.classList.remove('no-files-uploaded');
	      	
	        if (info.file.status === undefined) {
	          info.fileList.splice(-1,1);
	        }
	        if (info.file.status !== 'uploading') {
	          console.log(info.file, info.fileList);
	        }
	        if (info.file.status === 'removed') {
	          //let { saveFileList } = _that.state;
	          _that.setState({ saveFileList: info.fileList });
	          message.success(`${info.file.name} file removed successfully`);
	          document.getElementById("message").focus();
	        }
	        if (info.file.status === 'done') {
	          let { saveFileList } = _that.state;
	          saveFileList.push({ file: info.file.response.file });
	          _that.setState({ saveFileList: saveFileList });
	         
	          message.success(`${info.file.name} file uploaded successfully`);
	          document.getElementById("message").focus();
	        } else if (info.file.status === 'error') {
	          message.error(`${info.file.name} file upload failed.`);
	        }
	        _that.setState({ fileList: info.fileList });
	      },
	    };
		const detailMenu = (
			<Menu>
				{/*<Menu.Item key="1"><Icon type="download" />Generate Report</Menu.Item>*/}
				<Menu.Item key="2"><Button href={'/job/'+ this.props.chatroom.chatroom_job_id} className="view-job-details-btn" type="primary">View Jobs Details</Button></Menu.Item>							
			</Menu>
		);

		const afterIcons = (
			<div className="icons-group">
				<Upload className="links-group" {...props}>
					<a className="attachment-link"><Icon type="paper-clip" /></a>
				</Upload>
{/*				<a onClick={emogiesShow} id="smile-link" className="smile-link" href="javascript:;"><Icon type="smile" /></a>*/}
			</div>
		);
		return(
			<React.Fragment>
				<div className="mobile-chat-block">
					<div className="top-block">
						<div className="back-button-holder">
							<a className="back-button" onClick={this.closeChat.bind()} ><Icon type="arrow-left" /></a>
						</div>
						<h2>{this.props.chatroom.chatroom_job_title}</h2>
						<div className="right-options">
							<div className="option-menu">
								<Dropdown overlay={detailMenu} trigger={['click']}>
									<a><Icon type="ellipsis" /></a>
								</Dropdown>
							</div>
						</div>
					</div>
					<div className="bottom-block">
						<ul>
							{ messages && messages.map((message, index) => (
								<li key={index}>
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
												<span className="time">{moment(message.created_at).fromNow()}</span>
											</div>	
											<span className="msg-detail">{message.body}</span>
					                        { message && message.chat_message_files && message.chat_message_files.length ?
					                            <div className="thumbnail-holder">
						                            { message.chat_message_files.map(({file}, index) =>
						                            	<a key={index} target="_blank" href={file.url}>
						                            		{file.url.indexOf("png") > 0 || file.url.indexOf("jpg") > 0 || file.url.indexOf("jpeg") > 0 ?
						                            			<ThumbnailPreviewer key={index} file={file.thumb.url} />
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
								</li>
							))}
						</ul>
					</div>
					{this.props.chatroom.current_chatroom_id ? <ActionCable
						ref='notificationsChannel'
						channel={{channel: 'ChatroomsChannel',
								chatroom_id: this.props.chatroom.current_chatroom_id,
								room: this.props.chatroom.current_chatroom_id}}
						onReceived={this.onRecieved.bind(this)} /> : ''}
						<Form className="chatroom-submit-form" onSubmit={this.handleSubmit.bind(this, this.props.chatroom)}>
							{ this.state.fileList.length ?
								<FormItem>
								  {
								    this.state.fileList.map(({file}, index) =>
								      <ThumbnailPreviewer key={index} file={file} />
								    )
								  }
								  {/*<strong> {this.state.fileList.length} files attached </strong>*/}
								</FormItem>
							: ""
							}
							<div className="chat-bar">
								<Form.Item>
									{ getFieldDecorator('message')(
										<Input size="large" onChange={this.handleChange} placeholder="Say Something.." suffix={afterIcons} autoComplete="off" />
										) }
								</Form.Item>
							</div>
							<Form.Item className="send-message-button">
{/*										<Button type="primary" htmlType="submit">Submit</Button>*/}
							</Form.Item>
						</Form>
					{/*<Picker className="custom-emogi-block" onSelect={this.addEmoji} />*/}
				</div>
			</React.Fragment>
			);
		}
	}


function mapStateToProps(state, ownProps) {
	let chatroom = null;
	if (state.ChatroomReducer && state.ChatroomReducer.chatroom) {
		chatroom = state.ChatroomReducer.chatroom
	}
  return {
    chatroom: ownProps.chatroom || chatroom,
    chat_messages_reducer: state.chat_messages_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
	fetchUnreadMessagesCount: (user_id) => {
	  dispatch(unreadMessagesActions.fetch(user_id))
	},
	addMessageToChat: (message) => {
		return dispatch(cmActions.addToMessages(message));
	},
	markMessagesAsRead: (chatroom_id) => {
	  dispatch(messagereadActions.markChatMessagesAsRead(chatroom_id))
	},
	fetchAllMessages: (chatroom_id) => {
		return dispatch(cmActions.loadChatMessages(chatroom_id));
	},
    fetchAllChatrooms: () => {
      return dispatch(acActions.fetchAllChatrooms())
    },
  }
}

const wrappedChatroomMessageForm = Form.create()(ChatroomMessage);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedChatroomMessageForm);

