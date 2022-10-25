import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker } from 'antd';
import * as ueActions from './../../actions/users/user_educations';
import Defender from './../../helpers/defender';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;


class UserEducationForm extends Component {
  state = {
    confirmDirty: false,
    modal_educations: this.props.modal_educations
  }

  handleCancelUserEducation(e){
    e.preventDefault();
    this.setState({ modal_educations: false });
  }

  setModalEducations(modal_educations) {
    this.setState({ modal_educations });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let  data = {}
          data["degree_name"] = values.education_degree_name;
          data["starting_date"] = values.education_starting_date;
          data["ending_date"] = values.education_ending_date;
          data["institute_name"] = values.education_institution_name;
          data["description"] = values.education_description;
          this.props.addEducation({user_education: data});
          this.props.fetchUserEducations(Defender.currentUser().id);
          this.setState({
            modal_educations: false,
          });
        }
    else {
          // this.props.fetchUserEducations(Defender.currentUser().id);
          // this.setState({
          //   modal_educations: false,
          // });
    }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
          <Modal
            title="Add Education"
            centered
            visible={this.state.modal_educations}
            onOk={() => this.setModalEducations(false)}
            onCancel={() => this.setModalEducations(false)}
            footer={[
            <Form key={4} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>

              <FormItem className="degree-name">
                  {getFieldDecorator('education_degree_name',{
                    rules: [{ required: true, message: 'Enter Degree Name'}, {max: 100, message: 'Please enter less text for degree name'}],
                  })(
                  <Input size="large" placeholder="Degree Name" autosize={{ minRows: 1, maxRows: 2 }} />
                  )}
              </FormItem>
              <FormItem className="institution-name">
                  {getFieldDecorator('education_institution_name',{
                    rules: [{ required: true, message: 'Enter Institution Name ' }, {max: 100, message: 'Please enter less text for institution name'}],
                  })(
                  <Input size="large" placeholder="Institution Name" autosize={{ minRows: 1, maxRows: 2 }} />
                  )}
              </FormItem>
              <FormItem className="education-start-date">
                {getFieldDecorator('education_starting_date',{
                  rules: [{ required: true, message: 'Please Select Date' }],
                  initialValue: moment(),
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
              <FormItem className="education-end-date">
                {getFieldDecorator('education_ending_date',{
                  rules: [{ required: true, message: 'Please Select Date' }],
                  initialValue: moment(),
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
                  {getFieldDecorator('education_description',{
                    rules: [{ required: true, message: 'Please Enter Description' }, {max: 500, message: 'Please enter less text for description'}],
                  })(
                <TextArea placeholder="Education Details" autosize={{ minRows: 8, maxRows: 8 }} />
                  )}
              </FormItem>
              <Button key="back" onClick={this.handleCancelUserEducation.bind(this)}>Cancel</Button>
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
    toggleUserEducationForm: ownProps.cancelFunc,
    modal_educations: ownProps.modal_educations,
    user_educations_reducer: state.user_educations_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
     fetchUserEducations: (user_id) => {
       dispatch(ueActions.fetch(user_id))
     },

      addEducation: (data) => (dispatch(ueActions.add(data)))
  };
}

const wrappedUserEducationForm = Form.create()(UserEducationForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserEducationForm);
