import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import * as rActions from './../../../actions/auth/registrations';

const FormItem = Form.Item;

class Experience extends Component {
  state = {
    confirmDirty: false,
    name: 'experiences',
    fileList: [],
    saveFileList:[],
    skipFormVerification: true,
  }
  componentDidMount() {
    this.props.setCurrentForm({ currentObject: this });
  }
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.appendExperiences(values);
        this.props.form.resetFields();
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const { experiences } = this.props.FLRExperience;
    return (
      <div className="freelancer-signup-form-holder experience-block">
        <div className="freelancer-signup-heading">
          <h2>Join The Team</h2>
          <h3>4 - Professional Experience/Job History</h3>
        </div>
        <div className="freelancer-signup-body">
          <Form onSubmit={this.handleSubmit}>
            <div className="freelancer-signup-form-row">
              <div className="freelancer-signup-form-columns">
                <FormItem label="Title of Job/Designation">
                  {getFieldDecorator('designation', {
                      rules: [{ required: true, message: 'Enter Title of Job/Designation' }, {max: 50, message: 'Please enter less text for designation'}],
                    })(<Input size="large" />)
                  }
                </FormItem>
              </div>
              <div className="freelancer-signup-form-columns">
                <FormItem label="Date">
                  {getFieldDecorator('exp_date', {
                    rules: [{ required: true, message: 'Please Select Date' }],
                  })(<RangePicker size="large" style={{ width:"100%" }} />)}
                </FormItem>
              </div>
              <div className="freelancer-signup-form-columns">
                <FormItem label="Name of Company">
                  {getFieldDecorator('organization_name', {
                    rules: [{ required: true, message: 'Please Enter Company Name' }, {max: 50, message: 'Please enter less text for company name'}],
                  })(<Input size="large" />)}
                </FormItem>
              </div>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem label="Description">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please Enter Description' }, {max: 500, message: 'Please enter less text for description'}],
                })(<TextArea id="exp_description"  placeholder="Write a small description about what you have learned, what topics were covered etc" rows={4} />
                )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem>
                <Button className="add-btn" type="primary" onClick={this.handleSubmit}>Add</Button>
              </FormItem>
            </div>
            { experiences.map(({title, description, exp_date, organization_name, designation}, index) =>
              <div className="freelancer-signup add-data" key={index}>
                <div className="heading">
                  <div className="left-align">
                    <h3>{designation}<a href=""><Icon type="delete" theme="outlined" style={{ color:'#14141c' }} /></a></h3>
                    <span>{organization_name}</span>
                  </div>
                  <div className="right-align">
                    <span>{exp_date[0].calendar()} - {exp_date[1].calendar()}</span>
                  </div>
                </div>
                <div className="details">
                  <p>{ description }</p>
                </div>
              </div>

            )}
          </Form>
        </div>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    FLRExperience: state.FLRExperience
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appendExperiences: (data) => (dispatch(rActions.appendFLRExperiences(data)))
  }
}
const wrappedFreelancerExperienceForm = Form.create()(Experience);
export default connect(mapPropsToState, mapDispatchToProps)(wrappedFreelancerExperienceForm);
