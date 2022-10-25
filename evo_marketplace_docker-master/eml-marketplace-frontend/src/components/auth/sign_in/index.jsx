import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { push } from 'react-router-redux';
import * as rActions from './../../../actions/auth/sign_in';
import logo from './../../../images/logo-black.svg';
import signImage from './../../../images/il_login.png';
import Defender from './../../../helpers/defender';
const FormItem = Form.Item;

class SignIn extends Component {
  handleSubmit = (e) => {
	e.preventDefault();
	this.props.form.validateFields((err, values) => {
	  if (!err) {
		 this.props.dispatch(rActions.checkLoggedIn({user: values})).then( res => {
		   const { loggedInReducer, form } = this.props;
		   if (!loggedInReducer.success) {
			 let errors ={};
			 errors["email"] = {};
			 errors["email"]["value"] = values["email"];
			 errors["email"]["errors"] = [new Error(loggedInReducer.loggedInError.error)];
			 form.setFields(errors);
		   } else {
			  const token = res.headers['authorization'];
			  Defender.loggedIn(res.data, token);
			  if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("client")){
			  	this.props.dispatch(push('/client'));
			  }
			  if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("freelancer")){
			  	this.props.dispatch(push('/freelancer'));
			  }
			 // Trick to reload full page
			 setTimeout(function(){return window.location.reload();}, 50)
		   }

		 });
	  }
	});
  }
  render(){
	  if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("client")){
	  	this.props.dispatch(push('/client'));
	  }
	  if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("freelancer")){
	  	this.props.dispatch(push('/freelancer'));
	  }
	document.body.classList.add('sign-in-page');
	const { getFieldDecorator } = this.props.form;
	return (
		<div className="signin-holder">
			<div className="login-left-block">
				<img src={signImage} alt="Sign in | Wurker.ai - Connecting Top AI talent with Cool Companies" />
			</div>
			<div className="login-right-block">
				<div className="login-right-table">
					<div className="login-right-cell">
						<div className="signin-logo-holder">
							<a href="/">
								<img width="250" src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</a>
						</div>
						<h1><span>Login.</span> And Make AI Happen.</h1>
						<Form onSubmit={this.handleSubmit} className="login-form">
						  <FormItem>
							{getFieldDecorator('email', {
							  rules: [{ required: true, message: 'Please Enter the correct Email' }],
							})(
							  <Input size="large" prefix={<Icon type="mail" style={{ fontSize:'16px', marginLeft:'5px', color: 'rgba(0,0,0,.25)' }} />} placeholder="Email*" />
							)}
						  </FormItem>
						  <FormItem>
							{getFieldDecorator('password', {
							  rules: [{ required: true, message: 'Incorrect Password' }],
							})(
							  <Input size="large" prefix={<Icon type="lock" style={{ fontSize:'18px', marginLeft:'3px', color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password*" />
							)}
						  </FormItem>
						  <FormItem className="remember-block">
							{getFieldDecorator('remember', {
							  valuePropName: 'checked',
							  initialValue: true,
							})(
							  <Checkbox>Remember me</Checkbox>
							)}
							<a className="login-form-forgot" href="/password/reset">Forgot password</a>
						  </FormItem>
						  <div className="button-holder">
								<Button size="large" type="primary" htmlType="submit" className="login-form-button">Log in</Button>
						  </div>
							<p className="register-text">Want to hire an AI Freelancer ? <a className="register-now-btn" href="/job_creation">Post a job</a></p>
						</Form>
					</div>
				</div>
			</div>
		</div>
   );
  }
}
function mapPropsToState(state) {
  return {
	loggedInReducer: state.logInReducer
  };
}

const wrappedSignInForm = Form.create()(SignIn);

export default connect(mapPropsToState)(wrappedSignInForm);
