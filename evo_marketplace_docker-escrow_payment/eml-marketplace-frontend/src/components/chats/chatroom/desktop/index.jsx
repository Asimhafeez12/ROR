import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Form, Tabs, Input, Menu, Dropdown, Icon, message } from 'antd';
//import * as chatroomActions from './../../../../actions/user_chatrooms';
import * as acActions from './../../../../actions/all_chatrooms';
import * as cmActions from './../../../../actions/chat_messages';
import * as messagereadActions from './../../../../actions/read_messages';
import * as unreadMessagesActions from './../../../../actions/unread_messages';
import UserChatroom from './user_chatroom';
import ChatroomMessage from './chatroom_message';
import Defender from './../../../../helpers/defender';
import 'emoji-mart/css/emoji-mart.css'
//import { Picker } from 'emoji-mart';
import API from './../../../../api';
import { ActionCable } from 'react-actioncable-provider';

//import userImage from './../../../../images/user-image1.png';
//import chatUser1 from './../../../../images/chat-user.png';

//const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

const props = {
	name: 'file',
	multiple: true,
	action: '//jsonplaceholder.typicode.com/posts/',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if(document.querySelector('.ant-upload-list')){
			document.body.classList.add('files-uploaded');
		}
		else{
			document.body.classList.remove('files-uploaded');
		}

		if(info.file.status !== 'uploading') {
		}
		if(info.file.status === 'done') {
			message.success(`${info.file.name} file attached successfully`);
		}
		else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};


class ChatDesktop extends Component{

	constructor(props){
		super(props);
		this.state = {
			chatroom: props.chatroom,
			tabList: [],
			text: ""
		}
	}

	setActiveTab = (activeTab) => {
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


	handleSubmit(chatroom, e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (chatroom.current_chatroom_id) {
				this.sendMessage({body: values.message});
			} else {
				// TODO: should be dry
        
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

	render(){
		const { getFieldDecorator } = this.props.form;
		const { all_chatrooms } = this.props.all_chatrooms_reducer;
		//const { messages } = this.props.chat_messages_reducer;
		document.body.classList.add('chatroom-page');
		// function emogiesShow(){
		// 	document.body.classList.toggle('emogies-show');
		// }



		const detailMenu = (
			<Menu>
				{/*<Menu.Item key="1"><Icon type="download" />Generate Report</Menu.Item>*/}
			</Menu>
		);

		const afterIcons = (
			<div className="icons-group">
				<Upload className="links-group" {...props}>
					<a className="attachment-link" href=""><Icon type="paper-clip" /></a>
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
						{/*<h3>I need a chatbot engineer</h3>*/}
						<div className="right-options">
							<div className="search-holder">
								<Search placeholder="input search text" />
							</div>
							{/*<Button className="view-job-details-btn" type="primary" htmlType="submit">View Jobs Details</Button>*/}
							<div className="option-menu">
								<Dropdown overlay={detailMenu} trigger={['click']}>
									<a href=""><Icon type="ellipsis" /></a>
								</Dropdown>
							</div>
						</div>
						{/*<span className="chat-time">May 30</span>*/}
					</div>
				</div>
				<div className="bottom-block">
					<Tabs tabPosition='left' ref={ (node) => this.tabsPane = node } onChange={this.onTabChange}>
						{ all_chatrooms && all_chatrooms[0] !== undefined && all_chatrooms.map((chatroom, index) => (
							<TabPane className="custom-tab-right" key={index} tab={<UserChatroom chatroom={chatroom} />}  > 
								<ul>
									<ChatroomMessage setActiveTab={this.setActiveTab.bind(this)} chatroom={chatroom} />
								</ul>
								{chatroom.current_chatroom_id ? <ActionCable
									ref='notificationsChannel'
									channel={{channel: 'ChatroomsChannel',
											chatroom_id: chatroom.current_chatroom_id,
											room: chatroom.current_chatroom_id}}
									onReceived={this.onRecieved.bind(this)} /> : ''}
								<Form onSubmit={this.handleSubmit.bind(this, chatroom)}>
									<Form.Item>
										{ getFieldDecorator('message')(
											<Input size="large" onChange={this.handleChange} placeholder="Say Something and press enter..." suffix={afterIcons} />
											) }
									</Form.Item>
									<Form.Item className="send-message-button">
										<Button type="primary" htmlType="submit">Submit</Button>
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
	}
  }
}

const wrappedChatRoomsForm = Form.create()(ChatDesktop);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedChatRoomsForm);

