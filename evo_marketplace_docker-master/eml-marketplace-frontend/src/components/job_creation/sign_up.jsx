import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reaptcha from 'reaptcha';
import { Icon } from 'antd';
import { Form, Input, Button, Modal, message } from 'antd';
import * as rActions  from "./../../actions/auth/registrations";
import * as sActions from './../../actions/auth/sign_in';
import { push } from 'react-router-redux';
import logo from './../../images/logo-black.svg';
import Defender from './../../helpers/defender';



const FormItem = Form.Item;


class SignUp extends Component {

	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		modal_sign_up: this.props.modal_sign_up,
		loading: false,
		verified: false
	};

	onVerify = () => {
		this.setState({
		  verified: true
		});
	};

	setModalSignUp(modal_sign_up) {
	  this.setState({ modal_sign_up });
	}

	handleCancelSignUp(e){
	    e.preventDefault();
	    this.setState({ modal_sign_up: false });
	}

	enterLoading = () => {
		this.setState({ loading: !this.state.loading });
	}
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.verified === true){
			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
				 let  job = {}
		         job["title"] = this.props.title;
		         job["description"] = this.props.description;
		         job["minimum_budget"] = this.props.minimum_budget;
		         job["job_files_attributes"] = this.props.filesList;
		         job["skill_list"] = this.props.skill_list;
		         job["job_category_id"] = window.location.href.split('/')[4];
		         job["starting_date"] = this.props.startValue._d;
		         job["availability"] = this.props.availability;
		         if (this.props.duration.target){
		         	job["duration"] = this.props.duration.target.value;
		         }
		         else{
		         	job["duration"] = this.props.duration;
		         }
		         job["desired_profile"] = this.props.desired_profile;
		         job["additional_info"] = this.props.additional_info;
				 this.props.dispatch(rActions.registerUser({user: {...values, role_adder: 1}, job: {job}})).then((data) => {
					 const { registerUserReducer, form } = this.props;
					 if (!registerUserReducer.success) {
						 Object.keys(registerUserReducer.registerErrorMessage).map((key, index) => {
								const val = registerUserReducer.registerErrorMessage[key][0];
								let errors = {};
								errors[key] = {};
								errors[key]["value"] = values[key];
								errors[key]["errors"] = [new Error(val)];
								form.setFields(errors);
								this.enterLoading();
						 })
					 } else {
					 		 let  data = {};
					 		 data["email"]=values.email;
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
								 this.props.dispatch(push('/client'));
								 // Trick to reload full page
								 setTimeout(function(){return window.location.reload();}, 50)
							   }

							 });
					 }

				 });
				}
				else{
					e.preventDefault();
					//message.error("Please enter registration information");
					this.enterLoading();
				}
			});
		}
			else{
				e.preventDefault();
				message.error("Please check I am not a robot");
				this.enterLoading();
			}
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
		return (
          <Modal
            title="Sign Up"
            className="signup-popup"
            centered
            visible={this.state.modal_sign_up}
            onOk={() => this.setModalSignUp(false)}
            onCancel={() => this.setModalSignUp(false)}
            footer={[
				<div className="signup-form-holder">
					<div className="signup-logo">
					  <a href="./"><img src={logo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
					</div>
					<Form onSubmit={this.handleSubmit} disabled={!this.state.verified}>
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
							  rules: [{ required: true, message: 'Please input your Password!' }, {max: 30}, {min: 8}],
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
						<Reaptcha sitekey="6Le6qYkUAAAAAPV6uTAbMO6h4ElsQBV5OuJIXlIV" onVerify={this.onVerify} />
						<FormItem>
							<Button size="large" type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} onClick={this.enterLoading}>Register</Button>
							<p>I agreed to Wurker.AI <a className="login-form-forgot" target="_blank" href="/terms_of_service">Terms of Service</a> and <a className="login-form-forgot" target="_blank" href="/privacy_policy">Privacy Policy</a></p>
							<p>Already have an account? <a className="login-form-forgot" href="/sign_in">Sign in</a> <span>here</span></p>
						</FormItem> {/*<span> 6Le6qYkUAAAAANeE65aVElvnepTX6g5pEiYsIoqT </span>*/}
					</Form>
				</div>
                ]}
          >
          </Modal>
		);
	}
}


function mapPropsToState(state, ownProps){
	return {
		registerUserReducer: state.registerReducer,
		loggedInReducer: state.logInReducer,
	    toggleSignUpForm: ownProps.cancelFunc,
	    modal_sign_up: ownProps.modal_sign_up,
	    title: ownProps.title,
	    description: ownProps.description,
	    additional_info: ownProps.additional_info,
	    minimum_budget: ownProps.minimum_budget,
	    desired_profile: ownProps.desired_profile,
	    availability: ownProps.availability,
	    duration: ownProps.duration,
	    startValue: ownProps.startValue,
	    skill_list: ownProps.skill_list,
	    filesList: ownProps.filesList

	};
}
const wrappedSignupForm = Form.create()(SignUp);

export default connect(mapPropsToState)(wrappedSignupForm);
