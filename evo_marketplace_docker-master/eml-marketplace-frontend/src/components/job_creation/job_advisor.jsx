import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, TimePicker, DatePicker} from 'antd';
import * as jaActions from './../../actions/job_advisors';
import user_help from '../../images/advisor.png';
import moment from 'moment';

const FormItem = Form.Item;


class JobAdvisor extends Component {
  state = {
    confirmDirty: false,
    modalpopup: this.props.modalpopup,
    modalpopupsuccess: false,
  }

  setModalPopup(modalpopup) {
    this.setState({ modalpopup });
  }
  setModalSuccess(modalpopupsuccess) {
    this.setState({ modalpopupsuccess });
  }

  disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let  data = {}
        data["full_name"] = values.full_name;
        data["email"] = values.email;
        data["phone_number"] = values.phone_number;
        data["skype_id"] = values.skype_id;
        if (values.available_date){
          var date_temp = values.available_date._d.toISOString().slice(0, 10)
          data["available_date"] = date_temp;
        }
        if (values.available_time){
          data["available_time"] = new Date(values.available_time._d.getTime()).toLocaleTimeString();
        }
        this.props.saveJobAdvisor(data).then((res) => {
          if (!this.props.job_advisors_reducer.success) {
          }
        });
        this.setModalPopup(false);
        this.setModalSuccess(true);
      } 
      else {
       this.setModalPopup(true);
      }
    });
  }

  customClick(e){
    this.handleSubmit(e);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          className="hire-advisor-popup"
          centered
          width="610px"
          visible={this.state.modalpopup}
          onOk={() => this.setModalPopup(false)}
          onCancel={() => this.setModalPopup(false)}
          footer={[
          <Button key="back" onClick={() => this.setModalPopup(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={ this.customClick.bind(this) }>Book</Button>,
          ]}
        >
          <div className="popup-top">
            <h2>Talk to Advisor</h2>
            <span>Book an appointment</span>
          </div>
          <Form key={1} className="job-post-form" onSubmit={this.handleSubmitJobAdvisor}>
            <div className="popup-body">
              <div className="columns-holder">
                <div className="columns-holder-row">
                  <h3>Your Name :</h3>
                  <FormItem>
                    {getFieldDecorator('full_name', {
                      rules: [{
                        required: true, message: 'Please input full_name'
                      }, {max: 100, message: 'Please enter less text for full name'}]
                    })(
                      <Input size="large" />
                    )}
                  </FormItem>
                </div>
                <div className="columns-holder-row">
                  <h3>Email :</h3>
                  <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: 'The input is not valid'
                    }, {
                      required: true, message: 'Please input your Email'
                    }, {max: 200, message: 'Please enter shorter email'}],
                  })(
                    <Input size="large" />
                  )}
                  </FormItem>
                </div>
                <div className="columns-holder-row">
                  <h3>Phone Number :</h3>
                  <FormItem>
                    {getFieldDecorator('phone_number', {
                      rules: [{
                        required: true, message: 'Please input phone number'
                      }, {message: 'Please input numbers' }, {max: 100, message: 'Please enter proper phone number'}]
                    })(
                      <Input type="number" size="large" />
                    )}
                  </FormItem>
                </div>
                <div className="columns-holder-row">
                  <h3>Skype Id :</h3>
                  <FormItem>
                    {getFieldDecorator('skype_id', {
                      rules: [{
                        required: true, message: 'Please input skype id'
                      }, {max: 100, message: 'Please enter proper skype id'}]
                    })(
                      <Input size="large" />
                    )}
                  </FormItem>
                </div>
                <div className="columns-holder-row">
                  <h3>Availability - Date & Time</h3>
                    {getFieldDecorator('available_date', {
                      initialValue: moment().add('days', 2)
                    })(
                      <DatePicker size="large" placeholder="Choose Date" disabledDate={this.disabledDate} />
                  )}
                </div>
                <div className="columns-holder-row">
                    {getFieldDecorator('available_time', {
                    })(
                      <TimePicker size="large" placeholder="Choose Time" use12Hours />
                    )}
                </div>
              </div>
            </div>
          </Form>
        </Modal>
        <Modal
          className="hire-advisor-success"
          centered
          closable
          width="610px"
          visible={this.state.modalpopupsuccess}
          onCancel={() => this.setModalSuccess(false)}
          footer={[
            null,
            null,
          ]}
        >
          <div className="popup-top">
            <div className="image-holder">
              <img src={user_help} alt="User Help | Wurker.ai - Connecting Top AI talent with Cool Companies" />
            </div>
          </div>
          <div className="popup-body">
            <h3>Your appointment has been booked with our advisor</h3>
            <p>Our advisor will get in touch with your selected date & time.</p>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleJobAdvisorForm: ownProps.cancelFunc,
    modalpopup: ownProps.modalpopup,
    job_advisors_reducer: state.job_advisors_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      saveJobAdvisor: (data) => (dispatch(jaActions.submitForm({job_advisor: data})))
  };
}

const wrappedJobAdvisorForm = Form.create()(JobAdvisor);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobAdvisorForm);
