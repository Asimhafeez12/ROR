import React, { Component } from 'react';
import { Button} from 'antd';
import emailConfirmationBanner from './../../../images/email-confirmation-banner.png';

class ForgotPassSuccess extends Component {
  render(){
	return (
	  <div className="forgot-pass-success-holder">
		<div className="forgot-pass-success-top-bg">
		  <img src={emailConfirmationBanner} alt="Forgot Password Banner" />
		</div>
		<h1>Done</h1>
		<p>We have sent password reset instructions to your email. Kindly, follow the instructions to update your password</p>
		<Button type="primary" href="./sign_in">Login</Button>
	  </div>
   );
  }
}

export default ForgotPassSuccess;

