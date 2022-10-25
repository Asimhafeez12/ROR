import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Upload, Button, Form, Tabs, Input, Menu, Dropdown, Icon, message } from 'antd';
//import * as uActions from './../../../../actions/users';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';
//import UserChatroom from './user_chatroom';

import userImage from './../../../../images/user-image1.png';
import chatUser1 from './../../../../images/chat-user.png';

// const FormItem = Form.Item;
// const TabPane = Tabs.TabPane;
// const Search = Input.Search;

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


class ChatMobile extends Component{
	state = {
		text: "",
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


	openChat(){
		if(document.querySelector('.open_chat_link')){
			document.body.classList.add('open-chat');
		}
	}

	closeChat(){
		if(document.querySelector('.open_chat_link')){
			document.body.classList.remove('open-chat');
		}
	}


	render(){
		document.body.classList.add('chatroom-page');
		document.body.classList.add('mobile_version');
		function emogiesShow(){
			document.body.classList.toggle('emogies-show');
		}

		const detailMenu = (
			<Menu>
				<Menu.Item key="1"><Icon type="download" />Generate Report</Menu.Item>
				<Menu.Item key="2"><Button className="view-job-details-btn" type="primary" htmlType="submit">View Jobs Details</Button></Menu.Item>							
			</Menu>
		);

		const afterIcons = (
			<div className="icons-group">
				<Upload className="links-group" {...props}>
					<a className="attachment-link" href="javascript:;"><Icon type="paper-clip" /></a>
				</Upload>
				<a onClick={emogiesShow} id="smile-link" className="smile-link" href="javascript:;"><Icon type="smile" /></a>
			</div>
		);

		return(
			<div className="chatroom-holder mobile-holder">
				<div className="mobile-user-block">
					<div className="top-block">
						<h2>People & Groups</h2>
					</div>
					<div className="bottom-block">
						<ul>
							<li>
								<a className="open_chat_link" href="javascript:;" onClick={this.openChat.bind()} >
									<div className="user-data-holder">
										<div className="user-image-holder">
											<img src={userImage} alt="User img" />
											<span className="online-status online"></span>
										</div>
										<div className="user-content">
											<div className="user-title">
												<h3>Arshad Mehmood</h3>
												<span className="time">1m</span>
											</div>	
											<span className="msg-detail">Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</span>
										</div>
									</div>
								</a>
							</li>
							<li>
								<a className="open_chat_link" href="javascript:;" onClick={this.openChat.bind()} >
									<div className="user-data-holder">
										<div className="user-image-holder">
											<img src={chatUser1} alt="User img" />
											<span className="online-status online"></span>
										</div>
										<div className="user-content">
											<div className="user-title">
												<h3>Usman Ghani</h3>
												<span className="time">1m</span>
											</div>	
											<span className="msg-detail">Lorem ipsum dolor sit amet</span>
										</div>
									</div>
								</a>
							</li>
							<li>
								<a className="open_chat_link" href="javascript:;" onClick={this.openChat.bind()} >
									<div className="user-data-holder">
										<div className="user-image-holder">
											<img src={userImage} alt="User img" />
											<span className="online-status online"></span>
										</div>
										<div className="user-content">
											<div className="user-title">
												<h3>Arshad Mehmood</h3>
												<span className="time">1m</span>
											</div>	
											<span className="msg-detail">Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</span>
										</div>
									</div>
								</a>
							</li>
							<li>
								<a className="open_chat_link" href="javascript:;" onClick={this.openChat.bind()} >
									<div className="user-data-holder">
										<div className="user-image-holder">
											<img src={chatUser1} alt="User img" />
											<span className="online-status online"></span>
										</div>
										<div className="user-content">
											<div className="user-title">
												<h3>Usman Ghani</h3>
												<span className="time">1m</span>
											</div>	
											<span className="msg-detail">Lorem ipsum dolor sit amet</span>
										</div>
									</div>
								</a>
							</li>
							<li>
								<a className="open_chat_link" href="javascript:;" onClick={this.openChat.bind()} >
									<div className="user-data-holder">
										<div className="user-image-holder">
											<img src={userImage} alt="User img" />
											<span className="online-status online"></span>
										</div>
										<div className="user-content">
											<div className="user-title">
												<h3>Arshad Mehmood</h3>
												<span className="time">1m</span>
											</div>	
											<span className="msg-detail">Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</span>
										</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mobile-chat-block">
					<div className="top-block">
						<div className="back-button-holder">
							<a className="back-button" href="javascript:;" onClick={this.closeChat.bind()} ><Icon type="arrow-left" /></a>
						</div>
{/*						<h2>I need a chatbot engineer</h2>*/}
						<div className="right-options">
							<div className="option-menu">
								<Dropdown overlay={detailMenu} trigger={['click']}>
									<a href="javascript:;"><Icon type="ellipsis" /></a>
								</Dropdown>
							</div>
						</div>
					</div>
					<div className="bottom-block">
						<ul>
							<li>
								<div className="user-data-holder">
									<div className="user-image-holder">
										<img src={userImage} alt="User img" />
										<span className="online-status online"></span>
									</div>
									<div className="user-content">
										<div className="user-title">
											<h3>Arshad Mehmood</h3>
											<span className="time">1m</span>
										</div>	
										<span className="msg-detail">Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</span>
									</div>
								</div>
							</li>
							<li>
								<div className="user-data-holder">
									<div className="user-image-holder">
										<img src={chatUser1} alt="User img" />
										<span className="online-status online"></span>
									</div>
									<div className="user-content">
										<div className="user-title">
											<h3>Usman Ghani</h3>
											<span className="time">1m</span>
										</div>	
										<span className="msg-detail">Lorem ipsum dolor sit amet</span>
									</div>
								</div>
							</li>
						</ul>
						<div className="chat-bar">
							<Input size="large" value={this.state.text} onChange={this.handleChange} placeholder="Say Something..." suffix={afterIcons} />
						</div>
						<Picker className="custom-emogi-block" onSelect={this.addEmoji} />
					</div>
				</div>
			</div>
		);		
	}
}

export default ChatMobile