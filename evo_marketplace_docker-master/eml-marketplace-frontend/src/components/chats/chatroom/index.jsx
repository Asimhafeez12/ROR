import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";

import ChatDesktop from './desktop';
import ChatMobile from './mobile';

class ChatRooms extends Component{	
	render(){
		return(
			<React.Fragment>
				{
					isMobile?
						<ChatMobile />
					:
						<ChatDesktop />
				}
			</React.Fragment>

		);
	}
}

export default ChatRooms;

