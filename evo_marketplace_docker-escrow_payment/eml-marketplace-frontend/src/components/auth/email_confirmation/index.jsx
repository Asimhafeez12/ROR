import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import emailConfirmationBanner from './../../../images/email-confirmation-banner.png';
import EmailConfirmationApi from './../../../api/auth/email_confirmation';
import Defender from './../../../helpers/defender';

class EmailConfirmation extends Component {
  state = {
    confirmed: false,
    confirmed_message: ''
  }
  componentWillMount() {
    EmailConfirmationApi.confirm(this.props.params.confirmation_token).then( (response) => {
    });
  }
  render(){
    return (
      <div className="email-confirmation-holder">
        <div className="email-confirmation-top-bg">
          <img src={emailConfirmationBanner} alt="Email Confirmation Banner" />
        </div>
        <h1>Your Email has been confirmed successfully</h1>
        <p>Thank you for using AI Marketplace, vero Lorem ipsum dolor sit amet, concsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <Button type="primary" href="/" onClick={Defender.logout}>Take me Home</Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    params: ownProps.match.params
  }
}
export default connect(mapStateToProps)(EmailConfirmation);

