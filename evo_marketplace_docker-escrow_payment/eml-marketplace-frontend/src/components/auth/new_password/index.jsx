import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button, Icon } from 'antd';
import { push } from 'react-router-redux';
import * as rActions from './../../../actions/auth/new_password';
import emailConfirmationBanner from './../../../images/email-confirmation-banner.png';

const FormItem = Form.Item;

class NewPassword extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         
         this.props.dispatch(rActions.checkLoggedIn({user: values})).then( res => {
           const { newPasswordReducer, form } = this.props;
           if (!newPasswordReducer.success) {
             let errors ={};
             errors["email"] = {};
             errors["email"]["value"] = values["email"];
             form.setFields(errors);
           } else {
             this.props.dispatch(push('/reset_password_email_sent'));
             setTimeout(function(){return window.location.reload();}, 50)
           }

         });
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="forgot-password-holder">
        <div className="forgot-password-top-bg">
        <img src={emailConfirmationBanner} alt="Email Confirmation Banner" />
        </div>
        <h1>Forgot Your Password</h1>
        <p>Don't worry, we got you covered. Just enter your account email here and we will send you a password reset link to your email.</p>
        <Form onSubmit={this.handleSubmit} className="forgot-password-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Your email' }],
            })(
              <Input size="large" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </div>
     );

  }
}
function mapPropsToState(state) {
  return {
    newPasswordReducer: state.newPasswordReducer
  };
}

const wrappedNewPasswordForm = Form.create()(NewPassword);

export default connect(mapPropsToState)(wrappedNewPasswordForm);
