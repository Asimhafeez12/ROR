import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Form, Input, Button } from 'antd';
import * as rActions  from "./../../../actions/auth/registrations";
import * as sActions from './../../../actions/auth/sign_in';
import { push } from 'react-router-redux';
import logo from './../../../images/logo-black.svg';
import Defender from './../../../helpers/defender';


const FormItem = Form.Item;


class SignUp extends Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
	};
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
			 this.props.dispatch(rActions.registerUser({user: {...values, role_adder: 1}})).then((data) => {
				 const { registerUserReducer, form } = this.props;
				 if (!registerUserReducer.success) {
					 Object.keys(registerUserReducer.registerErrorMessage).map((key, index) => {
							const val = registerUserReducer.registerErrorMessage[key][0];
							let errors = {};
							errors[key] = {};
							errors[key]["value"] = values[key];
							errors[key]["errors"] = [new Error(val)];
							form.setFields(errors);
					 })
				 } else {
				 		 let  data = {};
				 		 data["email"]= values.email;
				 		 data["password"]=values.password;
						 this.props.dispatch(sActions.checkLoggedIn({user: data})).then( res => {
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
							 this.props.dispatch(push('/'));
							 // Trick to reload full page
							 setTimeout(function(){return window.location.reload();}, 50)
						   }

						 });
				 }

			 });
			}
		});
	}
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	handleWebsiteChange = (value) => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
		}
		this.setState({ autoCompleteResult });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		if (Defender.currentUser()){
			window.location = '/';
		}
		return (
			<div className="signup-form-holder">
				<div className="signup-logo">
				  <a href="./"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
				</div>
				<Form onSubmit={this.handleSubmit}>
					<FormItem>
						{getFieldDecorator('first_name', {
						  rules: [{ required: true, message: 'Please input your first name' }, {max: 100, message: 'Please enter less text for first name'}],
						})(
							<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('last_name', {
						  rules: [{ required: true, message: 'Please input your last name' }, {max: 100, message: 'Please enter less text for last name'}],
						})(
							<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('email', {
							rules: [{
								type: 'email', message: 'The input is not valid'
							}, {
								required: true, message: 'Please input your Email'
							}, {max: 100, message: 'Please enter valid email address'}],
						})(
						  <Input size="large" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
						  rules: [{ required: true, message: 'Please input your Password!' }, { min: 8 }, {max: 30}],
						})(
						  <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password_confirmation',{
							rules: [{
								required: true, message: 'Please confirm your password!'
							}, {
								validator: this.compareToFirstPassword,
							}]
						})(
					      <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
						)}
					</FormItem>

					<FormItem>
						<Button size="large" type="primary" htmlType="submit" className="login-form-button">Register</Button>
						<p>Already have an account? <a className="login-form-forgot" href="/sign_in">Sign in</a> here</p>
					</FormItem>
				</Form>
			</div>
		);
	}
}


function mapPropsToState(state){
	return {
		registerUserReducer: state.registerReducer,
		loggedInReducer: state.logInReducer
	};
}
const wrappedSignupForm = Form.create()(SignUp);

export default connect(mapPropsToState)(wrappedSignupForm);
