import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as vActions from './../../actions/user_chatrooms';
import Chat from './chat';
class UserChatroom extends Component {
  render() {
    const { chatrooms } = this.props.userchatroom_reducer;
    return (
      <div>
          { chatrooms.map( (chatroom, index) => <Chat chatroom={chatroom} key={index} /> ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userchatroom_reducer: state.userchatroom_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChatroom);
