import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Upload, message } from 'antd';
//import axios from 'axios';
import { ActionCable } from 'react-actioncable-provider';
import * as cmActions from './../../../actions/chat_messages';
import * as unreadMessagesActions from './../../../actions/unread_messages';
import * as mActions from './../../../actions/invited_openned_jobs';
import * as iajActions from './../../../actions/invited_active_jobs';
import * as vActions from './../../../actions/jobs/invited_freelancers';
import * as mcActions from './../../../actions/my_chatrooms';
import Defender from './../../../helpers/defender';
import ThumbnailPreviewer from './../../utils/thumbnail_previewer';
import ClientImage from './../../../images/client_default.png';
import FreelancerImage from './../../../images/freelancer_default.png';
import sendIcon from './../../../images/send-icon.svg';



import API from './../../../api';
import moment from 'moment';


const FormItem = Form.Item;

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom,
      		fileList: [],
      		saveFileList: [],
		}
	}

	scroll_method(){
		var element=0;
		element = document.querySelector('.popup-body');
		element.scrollTop = element.scrollHeight;
	}

	on_scroll(e){
		var element=0;
		element = document.querySelector('.popup-body');
		if(element.scrollTop + element.offsetHeight + 200 > element.scrollHeight){
		}
		else{
			console.log("Scrolling Top");
		}

	}

	componentWillMount(){
		this.props.fetchAllMessages(this.props.chatroom.chatroom_id);
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchMyChatrooms();
		const that=this;
		setTimeout(function(){
			that.scroll_method();
		}, 1000);

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

	componentDidMount(){
		this.scroll_method();
	}

	handleSubmit(e) {
		e.preventDefault();
		//const { messages } = this.props.chat_messages_reducer;
		const that = this;
		this.props.form.validateFields((err, values) => {
			if ((values.message !== "" && values.message !== undefined) || (this.state.saveFileList.length)){
      			if ((values.message !== "" && values.message !== undefined && that.checkIfEmailInString(values.message) === false && that.checkIfPhoneInString(values.message) === false && that.checkIfDomainExists(values.message) === true) || this.state.saveFileList.length){
					if (this.state.chatroom.chatroom_id) {
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
								if (window.location.href.indexOf("job") === -1){
									this.props.fetchMyJobs();
									this.props.fetchAllActiveJobs();
								}
								if (window.location.href.indexOf("job") > -1){
									this.props.fetchInvitedFreelancers(window.location.href.split('/')[4]);
								}
							});
					}
					this.props.form.resetFields();
					//this.scroll_method();
				}
				else{
					message.error('Message not allowed');
				}
			}
			else{
				message.error('Message not allowed');
			}
		});
	}
	onRecieved(message) {
		this.props.addMessageToChat(JSON.parse(message.message));
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchMyChatrooms();
		this.scroll_method();
	}
	sendMessage(message) {
		this.refs.notificationsChannel.perform('send_message', message);
		this.scroll_method();
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
		if (info.file.status === undefined){
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
    const afterIcons = (
        <Upload className="links-group" {...props}>
          <a className="attachment-link"><Icon type="paper-clip" /></a>
        </Upload>
    );

    return (
			<div id="chat-window" className='popup-box chat-popup' data={this.state.chatroom.chatroom_id}>
				{this.state.chatroom.chatroom_id ? <ActionCable
					ref='notificationsChannel'
					channel={{channel: 'ChatroomsChannel',
							chatroom_id: this.state.chatroom.chatroom_id,
							room: this.state.chatroom.chatroom_id}}
					onReceived={this.onRecieved.bind(this)} /> : ''}

					<div className="popup-header">
						<div className="popup-header-left">
{/*							<span className="online-status online"></span>*/}
							<h2><a href={'/profile/'+ this.state.chatroom.user_id}>{this.state.chatroom.full_name}</a></h2>
							<p><a>{this.state.chatroom.job_title}</a></p>
							{this.state.chatroom.job_state === "open" && Defender.currentUser()._r.includes("client")  ?
								<Button href={'/hire_freelancer/' + this.state.chatroom.job_id + '/user/' + this.state.chatroom.user_id} className="chat-hire-btn" type="primary">Hire</Button>
							: ""}
						</div>
						<div className="popup-header-right">
							<a id="minimize-btn" onClick={this.minimize.bind()}><Icon style={{ fontSize:'14px' }} type="minus" theme="outlined" /></a>
							<a id="exit-chat-window" onClick={this.destoryWindow.bind()} ><Icon style={{ fontSize:'14px' }} type="close" theme="outlined" /></a>
						</div>
					</div>
{/*					<a href = "javascript:;">Load More</a>*/}
					<div className="popup-body" onScroll={this.on_scroll}>
			            { messages.map((message, index) => (
			              <div className="message-list-block" key={index}>
			                <div className="chat-user-image">
								{!!message.user_role ?
									<React.Fragment>
					                    {!!message.user_avatar_url ?
			                                <React.Fragment>
			                                	<img src={message.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                                </React.Fragment> 
			                                :
									  		<React.Fragment>
									  			{message.user_role.includes("freelancer") ?
									  				<img src={FreelancerImage} className="payment-logo" alt="Escrow | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  			{message.user_role.includes("client") ?
									  				<img src={ClientImage} className="payment-logo" alt="Escrow | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  		</React.Fragment>
					                    }
									</React.Fragment>
									: 
									<React.Fragment>
					                    {!!message.user_avatar_url ?
			                                <React.Fragment>
			                                	<img src={message.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                                </React.Fragment>  
			                                :
									  		<React.Fragment>
									  			{message.user__r.includes("freelancer") ?
									  				<img src={FreelancerImage} className="payment-logo" alt="Escrow | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  			{message.user__r.includes("client") ?
									  				<img src={ClientImage} className="payment-logo" alt="Escrow | Wurker.ai - Connecting Top AI talent with Cool Companies" /> : ""
									  			}
									  		</React.Fragment>
					                    }
									</React.Fragment>
								}
			                </div>
			                <div className="chat-user-content">
			                    <h3>{message.body}</h3>
		                        { message && message.chat_message_files && message.chat_message_files.length ?
	                            <React.Fragment>{
	                              message.chat_message_files.map(({file}, index) =>
	                            	<a key={index} target="_blank" href={file.url}>
	                            		{file.url.indexOf("png") > 0 || file.url.indexOf("jpg") > 0 || file.url.indexOf("jpeg") > 0 ?
	                            			<ThumbnailPreviewer key={index} file={file.medium.url} />
	                            		: 
	                            		<React.Fragment>{file.url.replace(/^.*[\\\/]/, '')}</React.Fragment>
	                            		}
	                            	</a>
	                              )
	                            }
	                            </React.Fragment>
                          		: null }
                          		<p>{moment(message.created_at).fromNow()}</p>
			                </div>
			              </div>
			            ))}
					</div>

					<div className="popup-bottom">
						<Form onSubmit={this.handleSubmit.bind(this)}>
				              { this.state.fileList.length ?
								<FormItem>
				                  {
				                    this.state.fileList.map(({file}, index) =>
				                      <ThumbnailPreviewer key={index} file={file} />
				                    )
				                  }
				                  <strong className="file-attached-text"> {this.state.fileList.length} file(s) attached </strong>
				                </FormItem>
				                : ""
				              }
							<Form.Item className="input-send-message">
								{ getFieldDecorator('message')(
									<Input placeholder="Say something and press enter ..." suffix={afterIcons} autoComplete="off" />) 
								}
							</Form.Item>
							<Button className="send-message-button" htmlType="submit"><img src={sendIcon} className="payment-logo" alt="Send Button | Wurker.ai - Connecting Top AI talent with Cool Companies" /></Button>
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
	    },
		fetchMyJobs: () => {
		  dispatch(mActions.fetchAllOpennedJobs())
		},
	    fetchAllActiveJobs: () => {
	        dispatch(iajActions.fetch())
	    },
	    fetchInvitedFreelancers: (id) => {
	      return dispatch(vActions.fetchFreelancers(id))
	    },
	}
}
const wrappedMessageForm = Form.create()(Chat)
export default connect(mapStateToProps, mapDispatchToProps)(wrappedMessageForm);
