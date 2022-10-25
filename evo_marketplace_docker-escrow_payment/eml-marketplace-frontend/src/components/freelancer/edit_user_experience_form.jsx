import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker } from 'antd';
import * as uexActions from './../../actions/users/user_experiences';
import Defender from './../../helpers/defender';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;


class EditUserExperienceForm extends Component {
  state = {
    confirmDirty: false,
    modal_edit_experiences: this.props.modal_edit_experiences
  }

  handleCancelUserExperience(e){
    e.preventDefault();
    this.setState({ modal_edit_experiences: false });
  }

  setModalEditExperiences(modal_edit_experiences) {
    this.setState({ modal_edit_experiences });
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
          this.props.updateExperience(this.props.user_experience.id, data);
          this.props.fetchUserExperiences(Defender.currentUser().id);
          this.setState({
            modal_edit_experiences: false,
          });
        }
    else {
      this.props.fetchUserExperiences(Defender.currentUser().id);
      this.setState({
        modal_edit_experiences: false,
      });
    }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user_experience } = this.props;

    return (
      <div>
        <Modal
            title="Edit Experience"
            centered
            visible={this.state.modal_edit_experiences}
            onOk={() => this.setModalEditExperiences(false)}
            onCancel={() => this.setModalEditExperiences(false)}
            footer={[
            <Form key={6} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>

              <FormItem className="designation-title">
                  {getFieldDecorator('experience_designation',{
                    initialValue: user_experience.designation
                  })(
                  <Input placeholder="Designation" />
                  )}
              </FormItem>
              <FormItem className="organization-name">
                  {getFieldDecorator('experience_organization_name',{
                    initialValue: user_experience.organization_name
                  })(
                <Input placeholder="Organization Name" />
                  )}
              </FormItem>
                {getFieldDecorator('experience_starting_date',{
                    initialValue: moment(user_experience.starting_date)
                  })(
                  <DatePicker
                    size="large"
                    style={{width:'100%', fontSize:'14px'}}
                    disabledDate={this.disabledStartDate}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                )}
                {getFieldDecorator('experience_ending_date',{
                    initialValue: moment(user_experience.ending_date)
                  })(
                  <DatePicker
                    size="large"
                    style={{width:'100%', fontSize:'14px'}}
                    disabledDate={this.disabledStartDate}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                )}
              <FormItem>
                  {getFieldDecorator('experience_description',{
                    initialValue: user_experience.description
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
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleEditUserExperienceForm: ownProps.cancelFunc,
    modal_edit_experiences: ownProps.modal_edit_experiences,
    user_experiences_reducer: state.user_experiences_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
     fetchUserExperiences: (user_id) => {
       dispatch(uexActions.fetch(user_id))
     },

      updateExperience: (user_experience_id, data) => (dispatch(uexActions.update(user_experience_id, data)))
  };
}

const wrappedEditUserExperienceForm = Form.create()(EditUserExperienceForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEditUserExperienceForm);
