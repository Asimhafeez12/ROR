import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class Appointment extends Component {

  state = {
    lastScreen: true,
    confirmDirty: false
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  componentDidMount() {
    this.props.setCurrentForm({ currentObject: this });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="freelancer-signup-form-holder appointment-block">
        <div className="freelancer-signup-heading">
          <h2>Join The Team</h2>
          <h3>5 - Appointment Details</h3>
        </div>
        <div className="freelancer-signup-body">
          <Form onSubmit={this.handleSubmit}>
            <div className="freelancer-signup-form-row">
              <FormItem label="Skype Id">
                {getFieldDecorator('skype', {
                rules: [{ required: true, message: 'Please Enter your Skype id' }],
                })(<Input size="large" />
                )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Phone Number">
                {getFieldDecorator('phone_number', {
                rules: [{ required: true, message: 'Please Enter your Phone Number' }],
                })(<Input size="large" />
                )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Choose your date of availability">
                {getFieldDecorator('interview_date_availability', {
                rules: [{ required: true, message: 'Please Select Date' }],								
                })(<DatePicker size="large" placeholder="Choose Date" style={{ width:"100%" }} />)}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Choose your time of availability">
                {getFieldDecorator('interview_time_availability', {
                rules: [{ required: true, message: 'Please Select Time' }],								
                })(<TimePicker size="large" placeholder="Choose Time" style={{ width:"100%" }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />)}
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const wrappedAppointmentForm = Form.create()(Appointment);

export default connect(mapStateToProps)(wrappedAppointmentForm);
