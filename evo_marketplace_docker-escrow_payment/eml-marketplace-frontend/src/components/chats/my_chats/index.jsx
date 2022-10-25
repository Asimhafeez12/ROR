import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';
import * as mcActions from './../../../actions/my_chatrooms';
import * as chatroomActions from './../../../actions/user_chatrooms';

class MyChatroomsMenu extends Component {

  state = {
    messages: []
  }

  componentWillMount() {
    this.props.fetchMyChatrooms();
  }


  render() {
    const { currentUser } = this.props.auth;
    const { chatrooms } = this.props.my_chatrooms_reducer;
    return (
      <Menu>
        {chatrooms.map((chatroom) =>
          <Menu.Item onClick={ () => ( this.props.openChatroom({chatroom_id: chatroom.chatroom_id, user_id: chatroom.user_id, full_name: chatroom.user_full_name }) ) } key={chatroom.id}>
            {chatroom.user_full_name}
          </Menu.Item>
        )}
      </Menu>
   )
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    my_chatrooms_reducer: state.my_chatrooms_reducer,
    chatroom_reducer: state.userchatroom_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMyChatrooms: () => {
      return dispatch(mcActions.fetchMyChatrooms())
    },
    openChatroom: (data) => {
      return dispatch(chatroomActions.openUserChatroom(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChatroomsMenu);
