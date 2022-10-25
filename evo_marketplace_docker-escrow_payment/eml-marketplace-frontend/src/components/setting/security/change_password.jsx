import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import * as uActions from './../../../actions/users';

const FormItem = Form.Item;


class ChangePassword extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            //data["current_password"] = values.current_password;
            data["password"] = values.password;
            data["password_confirmation"] = values.password_confirmation;
          	this.props.update_password({user: data});
          	//Defender.logout();
          	window.location = '/';
        }
    	else {
    	}
    });
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
				                	<input type="password" />
				                  )}
				              </FormItem>
						</div>
						<div className="security-form-row">
							<label className="required-field">Update Password</label>
				              <FormItem>
				                  {getFieldDecorator('password',{
				                  })(
				                	<input type="password" />
				                  )}
				              </FormItem>
						</div>
						<div className="security-form-row">
							<label className="required-field">Confirm Password</label>
				              <FormItem>
				                  {getFieldDecorator('password_confirmation',{
				                  })(
				                	<input type="password" />
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
    user_view_reducer: state.user_view_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
     update_password: (data) => (dispatch(uActions.update_password(data))),
  };
}

const wrappedChangePasswordForm = Form.create()(ChangePassword);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedChangePasswordForm);
