import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Form, Tabs, Input, Icon, message } from 'antd';
//import * as chatroomActions from './../../../../actions/user_chatrooms';
import * as acActions from './../../../../actions/all_chatrooms';
import * as cmActions from './../../../../actions/chat_messages';
import * as messagereadActions from './../../../../actions/read_messages';
import * as unreadMessagesActions from './../../../../actions/unread_messages';
import UserChatroom from './user_chatroom';
import ChatroomMessage from './chatroom_message';
import Defender from './../../../../helpers/defender';
import 'emoji-mart/css/emoji-mart.css'
import API from './../../../../api';
import { ActionCable } from 'react-actioncable-provider';
import ThumbnailPreviewer from './../../../utils/thumbnail_previewer';
import * as chatroomActions from './../../../../actions/chatroom';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
document.body.classList.add('no-files-uploaded');


class ChatDesktop extends Component{
	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom,
      		fileList: [],
      		saveFileList: [],
			tabList: [],
			text: "",
		}
	}


	componentWillMount(){
		this.props.fetchAllChatrooms();
	}

	setActiveTab = (chatroom, activeTab) => {
		this.setState({
		    chatroom: chatroom
		});
		this.props.updateChatroom(chatroom)
		let { tabList } = this.state;
		tabList.push(activeTab);
		this.setState({ tabList: tabList });
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchAllChatrooms();
	}
	
	handleChange = (e) => {
		this.setState({ text: e.target.value })
	}

	addEmoji = (e) => {
		if (e.unified.length <= 5){
			let emojiPic = String.fromCodePoint(`0x${e.unified}`)
			this.setState({
				text: this.state.text + emojiPic
			})
		}
		else {
			let sym = e.unified.split('-')
			let codesArray = []
			sym.forEach(el => codesArray.push('0x' + el))
			let emojiPic = String.fromCodePoint(...codesArray)
			this.setState({
				text: this.state.text + emojiPic
			})
		}
		document.body.classList.remove('emogies-show');
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
	onTabChange = (tabNum) => {
		let { tabList } = this.state;
		const activeTab = tabList[tabNum];
		if(activeTab) {
			activeTab.refreshMesages();
		}
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchAllChatrooms();
	}

	mark_messages_as_read(obj_chatroom_id, e) {
	  this.props.markMessagesAsRead(obj_chatroom_id);
	}

	openChat(chatroom, e){
		this.setState({
		    chatroom: chatroom
		});
		this.props.updateChatroom(chatroom)
	}

	render(){
		document.body.classList.add('chatroom-page');
		document.body.classList.add('desktop_version');

		// function emogiesShow(){
		// 	document.body.classList.toggle('emogies-show');
		// }


		const { getFieldDecorator } = this.props.form;
		const { all_chatrooms } = this.props.all_chatrooms_reducer;
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
	        } 
	        else if (info.file.status === 'error') {
	          message.error(`${info.file.name} file upload failed.`);
	        }
	        _that.setState({ fileList: info.fileList });

	      },


	    };

		// const detailMenu = (
		// 	<Menu>
		// 		<Menu.Item key="1"><Icon type="download" />Generate Report</Menu.Item>
		// 	</Menu>
		// );
		const afterIcons = (
			<div className="icons-group">
				<Upload className="links-group" {...props}>
					<a className="attachment-link"><Icon type="paper-clip" /></a>
				</Upload>
{/*				<a onClick={emogiesShow} id="smile-link" className="smile-link" href=""><Icon type="smile" /></a>*/}
			</div>
		);

		return(
			<div className="chatroom-holder">
				<div className="top-block">
					<div className="left-heading">
						<h2>People & Groups</h2>
					</div>
					<div className="right-heading">
						{ this.props.Chtroom_Reducer && this.props.Chtroom_Reducer.chatroom ? 
							<h3>{this.props.Chtroom_Reducer.chatroom.chatroom_job_title}</h3>
						: null
						}
						<div className="right-options">
{/*							<div className="search-holder">
								<Search placeholder="Search text" />
							</div>*/}
							{ this.props.Chtroom_Reducer && this.props.Chtroom_Reducer.chatroom ? 
								<Button href={'/job/'+ this.props.Chtroom_Reducer.chatroom.chatroom_job_id} className="view-job-details-btn" type="primary">View Jobs Details</Button>
							: null
							}
{/*							<div className="option-menu">
								<Dropdown overlay={detailMenu} trigger={['click']}>
									<a href=""><Icon type="ellipsis" /></a>
								</Dropdown>
							</div>*/}
						</div>
						{/*<span className="chat-time">May 30</span>*/}
					</div>
				</div>
				<div className="bottom-block">
					<Tabs tabPosition='left' ref={ (node) => this.tabsPane = node } onChange={this.onTabChange}>
						{ all_chatrooms && all_chatrooms[0] !== undefined && all_chatrooms.map((chatroom, index) => (
							<TabPane className="custom-tab-right" key={index} tab={<UserChatroom chatroom={chatroom} />}  > 

								<div className="chatlist-holder">
									<ul>
										<ChatroomMessage setActiveTab={this.setActiveTab.bind(this, chatroom)} chatroom={chatroom} />
									</ul>
								</div>

								{chatroom.current_chatroom_id ? <ActionCable
									ref='notificationsChannel'
									channel={{channel: 'ChatroomsChannel',
											chatroom_id: chatroom.current_chatroom_id,
											room: chatroom.current_chatroom_id}}
									onReceived={this.onRecieved.bind(this)} /> : ''}

									<Form className="chatroom-submit-form" onSubmit={this.handleSubmit.bind(this, chatroom)}>
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
									<Form.Item>
										{ getFieldDecorator('message')(
											<Input size="large" onChange={this.handleChange} placeholder="Say Something and press enter..." suffix={afterIcons} autoComplete="off" />) 
										}
									</Form.Item>
									<Form.Item className="send-message-button">
		{/*										<Button type="primary" htmlType="submit">Submit</Button>*/}
									</Form.Item>
								</Form>

							</TabPane>
						))}
					</Tabs>
				</div>
			</div>
			);
		}
	}


function mapStateToProps(state) {
  return {
  	Chtroom_Reducer: state.ChatroomReducer,
    chatroom_reducer: state.userchatroom_reducer,
    all_chatrooms_reducer: state.all_chatrooms_reducer,
    chat_messages_reducer: state.chat_messages_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllChatrooms: () => {
      return dispatch(acActions.fetchAllChatrooms())
    },
	fetchUnreadMessagesCount: (user_id) => {
	  dispatch(unreadMessagesActions.fetch(user_id))
	},
	addMessageToChat: (message) => {
		return dispatch(cmActions.addToMessages(message));
	},
	markMessagesAsRead: (chatroom_id) => {
	  dispatch(messagereadActions.markChatMessagesAsRead(chatroom_id))
	},
	updateChatroom: (chatroom) => (dispatch(chatroomActions.update(chatroom)))
  }
}

const wrappedChatRoomsForm = Form.create()(ChatDesktop);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedChatRoomsForm);

