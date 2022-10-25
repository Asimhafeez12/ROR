import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message } from 'antd';
import * as uActions from './../../../actions/users';
import Defender from './../../../helpers/defender';

const FormItem = Form.Item;


class ChangePassword extends Component{

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
	        let  data = {}
		        data["current_password"] = values.current_password;
		        data["password"] = values.password;
		        data["password_confirmation"] = values.password_confirmation;
			 	this.props.dispatch(uActions.update_password({user: data})).then((data) => {
					if (data && data.data && data.data.errors && data.data.errors.length > 0) {
						message.error("Current Password is not correct")
					} else {
					  if (Defender.currentUser()._r.includes("client")){
					  	window.location = "/client"
					  }
					  if (Defender.currentUser()._r.includes("freelancer")){
					  	window.location = "/freelancer"
					  }
					}

			 });
			}
		});
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

	render(){
		const { getFieldDecorator } = this.props.form;

 		return(
			<div className="input-fields-holder">
				<div className="input-fields-holder">
					<h2>Change Password</h2>
					<Form key={1} className="password-form" onSubmit={this.handleSubmit.bind(this)}>
						<div className="security-form-row">
							<label className="required-field">Current Password</label>
				              <FormItem>
				                  {getFieldDecorator('current_password',{
				                  })(
				                	<input type="password" placeholder="Current Password" />
				                  )}
				              </FormItem>
						</div>
						<div className="security-form-row">
							<label className="required-field">Update Password</label>
						<FormItem>
							{getFieldDecorator('password', {
							  rules: [{ required: true, message: 'Please input your Password!' }, { min: 8 }, {max: 30} ],
							})(
							  <Input type="password" placeholder="Password" />
							)}
						</FormItem>
						</div>
						<div className="security-form-row">
							<label className="required-field">Confirm Password</label>
						<FormItem>
							{getFieldDecorator('password_confirmation',{
								rules: [{
									required: true, message: 'Please confirm your password!'
								}, {
									validator: this.compareToFirstPassword,
								}]
							})(
						      <Input type="password" placeholder="Confirm Password" />
							)}
						</FormItem>
						</div>
						<div className="security-form-row">
							<Button type="primary" htmlType="submit">Save Changes</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
  return {
    user_view_reducer: state.user_view_reducer,
    registerUserReducer: state.registerReducer,
  };
}

const wrappedChangePasswordForm = Form.create()(ChangePassword);
export default connect(mapStateToProps)(wrappedChangePasswordForm);
