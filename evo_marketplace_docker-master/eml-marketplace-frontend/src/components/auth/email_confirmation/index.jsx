import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import emailConfirmationBanner from './../../../images/email-confirmation-banner.png';
import EmailConfirmationApi from './../../../api/auth/email_confirmation';
import Defender from './../../../helpers/defender';
import * as userActions from './../../../actions/users';

class EmailConfirmation extends Component {
  state = {
    confirmed: false,
    confirmed_message: ''
  }
  componentWillMount() {
    EmailConfirmationApi.confirm(this.props.params.confirmation_token).then( (response) => {
      this.props.updateCurrentUser();
    });
  }
  render(){
    return (
      <div className="email-confirmation-holder">
        <div className="email-confirmation-top-bg">
          <img src={emailConfirmationBanner} alt="Email | Wurker.ai - Connecting Top AI talent with Cool Companies" />
        </div>
        <h1>Your Email has been confirmed successfully</h1>
        {Defender.currentUser() && Defender.currentUser()._r.includes("client") ?
          <Button type="primary" href="/client">Take me Home</Button>
        : "" }
        {Defender.currentUser() && Defender.currentUser()._r.includes("freelancer") ?
          <Button type="primary" href="/freelancer">Take me Home</Button>
        : "" }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    params: ownProps.match.params
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentUser: () => (dispatch(userActions.updateCurrentUser())),
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
