import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import * as umActions from './../../../actions/update_milestone';
import * as jmActions from './../../../actions/job_milestones';

import moment from 'moment';
const FormItem = Form.Item;

class EditProjectMilestoneForm extends Component {
  state = {
    confirmDirty: false,
    edit_modal_milestones: this.props.edit_modal_milestones,
    visible: this.props.edit_modal_milestones,
    confirmLoading: false,
  }
  setEditModalMilestones(edit_modal_milestones) {
    this.setState({ edit_modal_milestones });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ confirmLoading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["is_accepted"] = false;
        this.props.editMilestone(this.props.milestone_id,{project_milestone: values})
          .then
          (res =>
            this.setState({visible: false, confirmLoading: false}),
            this.props.fetchJobMilestones(this.props.job_id)
          );
      } else {
        this.setState({visible: false, confirmLoading: false})
      }
    });
  }
  onChange = (val, e) => {
    this.props.form.setFieldsValue({
      user_id: val
    });
  }

  disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day').add(2, 'days');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.props.view_job_reducer;
    const { TextArea } = Input;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="Edit Milestone"
          className="add-milestone-popup"
          centered
          confirmLoading={confirmLoading}
          visible={visible}
          onOk={() => this.setEditModalMilestones(false)}
          onCancel={() => this.setState({ visible: false }) }
          footer={[
          <Form key="modal-form-pm" onSubmit={this.handleSubmit}>
            <FormItem label="Milestone Description">
              {getFieldDecorator('description', {
              initialValue: this.props.milestone_description,
              rules: [{
              required: true, message: 'Please input description'
              }]
              })(<TextArea autosize={{ minRows: 3, maxRows: 3 }} />)}
            </FormItem>
            <div className="milestone-row">
              <div className="milestone-column">
                <FormItem label="Deposit Amount">
                  {getFieldDecorator('price', { 
                  initialValue: this.props.milestone_price.fractional/100,
                  rules: [{
                  required: true, message: 'Please input price'
                  }]
                  })(<Input size="large" addonBefore="$" min={0} max={job.minimum_budget} />)}
                </FormItem>
              </div>
              <div className="milestone-column add">
                <FormItem label="Expected Date">
                  {getFieldDecorator('closing_date',{
                    initialValue: moment(this.props.milestone_closing_date)
                  }
                  )(<DatePicker disabledDate={this.disabledDate} size="large" />)}
                </FormItem>
              </div>
            </div>
            <Form.Item className="milestone-button-holder">
              <Button size="large" onClick={this.props.toggleEditForm}>Cancel</Button>
              <Button size="large" type="primary" htmlType="submit" loading={confirmLoading}>Update</Button>
            </Form.Item>
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
	view_job_reducer: state.job_view_reducer,
	toggleEditForm: ownProps.cancelFunc,
	edit_modal_milestones: ownProps.edit_modal_milestones,
  milestone_id: ownProps.milestone_id,
  milestone_description: ownProps.milestone_description,
  milestone_price: ownProps.milestone_price,
  milestone_closing_date: ownProps.milestone_closing_date,
  job_id: ownProps.job_id
  };
}

function mapDispatchToProps(dispatch) {
  return {
	editMilestone: (milestone_id, data) => (dispatch(umActions.submitForm(milestone_id, data))),
  fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),
  };
}

const wrappedEditProjectMilestoneForm = Form.create()(EditProjectMilestoneForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEditProjectMilestoneForm);
