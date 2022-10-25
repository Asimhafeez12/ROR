import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker } from 'antd';
import * as uexActions from './../../actions/users/user_experiences';
import Defender from './../../helpers/defender';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;


class UserExperienceForm extends Component {
  state = {
    confirmDirty: false,
    modal_experiences: this.props.modal_experiences
  }

  handleCancelUserExperience(e){
    e.preventDefault();
    this.setState({ modal_experiences: false });
  }

  setModalExperiences(modal_experiences) {
    this.setState({ modal_experiences });
  }


  handleSubmit = (e) => {
      e.preventDefault();
  
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let  data = {}
          data["designation"] = values.experience_designation;
          data["starting_date"] = values.experience_starting_date;
          data["ending_date"] = values.experience_ending_date;
          data["organization_name"] = values.experience_organization_name;
          data["description"] = values.experience_description;
          this.props.addExperience({user_experience: data});
          this.props.fetchUserExperiences(Defender.currentUser().id);
          this.setState({
            modal_experiences: false,
          });
        }
    else {
      // this.props.fetchUserExperiences(Defender.currentUser().id);
      // this.setState({
      //   modal_experiences: false,
      // });
    }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <Modal
            title="Add Experience"
            centered
            visible={this.state.modal_experiences}
            onOk={() => this.setModalExperiences(false)}
            onCancel={() => this.setModalExperiences(false)}
            footer={[
            <Form key={6} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>

              <FormItem className="designation-title">
                  {getFieldDecorator('experience_designation',{
                    rules: [{ required: true, message: 'Enter Title of Job/Designation' }, {max: 50, message: 'Please enter less text for designation'}],
                  })(
                  <Input size="large" placeholder="Designation" />
                  )}
              </FormItem>
              <FormItem className="organization-name">
                  {getFieldDecorator('experience_organization_name',{
                    rules: [{ required: true, message: 'Please Enter Company Name' }, {max: 50, message: 'Please enter less text for company name'}],
                  })(
                <Input size="large" placeholder="Organization Name" />
                  )}
              </FormItem>
              <FormItem className="experience-start-date">
                {getFieldDecorator('experience_starting_date',{
                  initialValue: moment(),
                  rules: [{ required: true, message: 'Please Select Date' }],
                })(
                <DatePicker
                  size="large"
                  style={{width:'100%', fontSize:'14px'}}
                  disabledDate={this.disabledStartDate}
                  placeholder="Start Date"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                )}
              </FormItem>
              <FormItem className="experience-end-date">
                {getFieldDecorator('experience_ending_date',{
                  initialValue: moment(),
                  rules: [{ required: true, message: 'Please Select Date' }],
                })(
                <DatePicker
                  size="large"
                  style={{width:'100%', fontSize:'14px'}}
                  disabledDate={this.disabledStartDate}
                  placeholder="End Date"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('experience_description',{
                    rules: [{ required: true, message: 'Please Enter Description' }, {max: 500, message: 'Please enter less text for description'}],
                  })(
                <TextArea placeholder="Experience Details" autosize={{ minRows: 8, maxRows: 8 }} />
                  )}
              </FormItem>
              <Button key="back" onClick={this.handleCancelUserExperience.bind(this)}>Cancel</Button>
                   <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
            </Form>
                ]}
          >
          </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleUserExperienceForm: ownProps.cancelFunc,
    modal_experiences: ownProps.modal_experiences,
    user_experiences_reducer: state.user_experiences_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
     fetchUserExperiences: (user_id) => {
       dispatch(uexActions.fetch(user_id))
     },

      addExperience: (data) => (dispatch(uexActions.add(data)))
  };
}

const wrappedUserExperienceForm = Form.create()(UserExperienceForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserExperienceForm);
