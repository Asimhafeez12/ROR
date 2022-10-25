import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class PersonalInformation extends Component {

  state = {
    confirmDirty: false,
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.confirmDirty || !!value
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
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
  componentDidMount() {
    this.props.setCurrentForm({ currentObject: this });
  }
  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="freelancer-signup-form-holder">
        <div className="freelancer-signup-heading">
          <h2>Join The Team</h2>
          <h3>1 - Personal Information</h3>
        </div>
        <div className="freelancer-signup-body">
          <Form onSubmit={this.handleSubmit}>
            <div className="freelancer-signup-form-row">
              <FormItem label="First Name">
                {getFieldDecorator('first_name', {
                rules: [{ required: true, message: 'Please enter your first name' }],
                })(<Input size="large" />
                )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Last Name">
                {getFieldDecorator('last_name', {
                rules: [{ required: true, message: 'Please enter your last name' }],
                })(<Input size="large" />
                )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Email">
                {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The email is not valid'
                }, {
                  required: true, message: 'Please input your Email'
                }],
                })( <Input size="large" /> )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Password">
                {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input type="password" size="large" /> )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Re-Type Password">
                {getFieldDecorator('password_confirmation',{
                rules: [{
                  required: true, message: 'Please confirm your password!'
                }, {
                  validator: this.compareToFirstPassword,
                }]
                })(
                <Input type="password" size="large" /> )}
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    registerFLReducer: state.registerFLReducer
  }
}

const wrappedPersonalInformationForm = Form.create()(PersonalInformation);

export default connect(mapPropsToState)(wrappedPersonalInformationForm);
