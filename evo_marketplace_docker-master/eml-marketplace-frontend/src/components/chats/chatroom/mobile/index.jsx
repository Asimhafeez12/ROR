import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
//import * as chatroomActions from './../../../../actions/user_chatrooms';
import * as acActions from './../../../../actions/all_chatrooms';
import * as cmActions from './../../../../actions/chat_messages';
import * as messagereadActions from './../../../../actions/read_messages';
import * as unreadMessagesActions from './../../../../actions/unread_messages';
import UserChatroom from './user_chatroom';
import ChatroomMessage from './chatroom_message';
import Defender from './../../../../helpers/defender';
import 'emoji-mart/css/emoji-mart.css'
import * as chatroomActions from './../../../../actions/chatroom';

class ChatMobile extends Component{

	state = {
		chatroom: null
	}

	constructor(props){
		super(props);
		this.state = {
			tabList: [],
			text: "",
		}
	}
	componentWillMount(){
		this.props.fetchAllChatrooms();
	}
	setActiveTab = (activeTab) => {
		let { tabList } = this.state;
		tabList.push(activeTab);
		this.setState({ tabList: tabList });
		this.props.fetchUnreadMessagesCount(Defender.currentUser().id);
		this.props.fetchAllChatrooms();
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
		if(document.querySelector('.open_chat_link')){
			document.body.classList.add('open-chat');
		}
		this.props.updateChatroom(chatroom)
	}

	render(){
		const { all_chatrooms } = this.props.all_chatrooms_reducer;
		document.body.classList.add('chatroom-page');
		document.body.classList.add('mobile_version');

		return(
			<div className="chatroom-holder mobile-holder">
				<div className="mobile-user-block">
					<div className="top-block">
						<h2>People & Groups</h2>
					</div>
					<div className="bottom-block">
						<ul>
						{ all_chatrooms && all_chatrooms[0] !== undefined && all_chatrooms.map((chatroom, index) => (
							<li key={index}>
								<a className="open_chat_link" onClick={this.openChat.bind(this, chatroom)} >
									<UserChatroom chatroom={chatroom} />
								</a>
							</li>
						))}
						</ul>
					</div>
				</div>

				{ this.props.Chtroom_Reducer && this.props.Chtroom_Reducer.chatroom ? <ChatroomMessage chatroom={null}/> : null }
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

const wrappedChatRoomsForm = Form.create()(ChatMobile);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedChatRoomsForm);
