import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Button, Icon } from 'antd';
import * as rActions from './../../../actions/auth/edit_password';
import logo from './../../../images/logo-white.svg';
import {push} from 'react-router-redux';


const FormItem = Form.Item;


class EditPassword extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const token = this.props.match.params.reset_password_token;
        let user = {};
        user["user"]=values;
        user["user"]["reset_password_token"] = token;
        this.props.dispatch(rActions.checkLoggedIn(user)).then( (res) => {
          const { editPasswordReducer, form } = this.props;
          if (!editPasswordReducer.success) {
            let errors ={
              password: {},
              password_confirmation: {}
            };
            errors["password"]["value"] = values["password"];
            errors["password_confirmation"]["value"] = values["password_confirmation"];
            let allErrors = [];
            const { editPasswordError } = editPasswordReducer;
            Object.keys(editPasswordError).forEach((key) => {
              allErrors.push(key + " " + editPasswordError[key].join(","));
            });
            errors["password"]["errors"] = [new Error(allErrors.join(","))];
            form.setFields(errors);
          } else {
            this.props.dispatch(push('/'));
            // Trick to reload full page
            setTimeout(function(){return window.location.reload();}, 50)
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

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="change-password-table">
				<div className="change-password-table-cell">
					<div className="change-password-holder">
						<div className="change-password-top-bg">
							<div className="change-password-logo">
								<img src={logo} alt="Email Confirmation Banner" />
							</div>
						</div>
						<h1>Change Your Password</h1>
						<Form onSubmit={this.handleSubmit} className="change-password-form">

							<FormItem>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Enter New Password!' }],
								})(
									<Input size="large" prefix={<Icon type="lock" style={{ fontSize:'18px', color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Enter New Password" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password_confirmation', {
									rules: [{ required: true, message: 'Confirm New Password!' },
									{validator: this.compareToFirstPassword,}
									],
								})(
									<Input size="large" prefix={<Icon type="lock" style={{ fontSize:'18px', color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm New Password" />
								)}
							</FormItem>

							<FormItem>
								<Button size="large" type="primary" htmlType="submit">Change Password</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</div>
	   );
	}
}


function mapPropsToState(state){
	return {
		editPasswordReducer: state.editPasswordReducer,
	};
}
const wrappedEditPasswordForm = Form.create()(EditPassword);

export default connect(mapPropsToState)(wrappedEditPasswordForm);
