import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import * as jmActions from './../../../actions/job_milestones';
import moment from 'moment';
const FormItem = Form.Item;

class ProjectMilestoneForm extends Component {
  state = {
    confirmDirty: false,
    modal_milestones: this.props.modal_milestones,
    visible: this.props.modal_milestones,
    confirmLoading: false,
  }
  setModalMilestones(modal_milestones) {
    this.setState({ modal_milestones });
  }

  componentWillMount() {
    this.props.fetchJobMilestones(window.location.href.split('/')[4]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { job } = this.props.view_job_reducer;
    const { accepted_freelancers } = this.props.accepted_freelancers_reducer;
    const { job_milestones } = this.props.job_milestone_reducer;

    this.setState({ confirmLoading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["title"] = "Milestone" + ' ' + (job_milestones.length + 1);
        values["user_id"] = accepted_freelancers[0].user_id;
        values["is_accepted"] = false;
        this.props.addMilestone(job.id,{project_milestone: values})
          .then(res =>
            this.setState({visible: false, confirmLoading: false})
          );
      } else {
        this.setState({confirmLoading: false});
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

  check_minimum_budget = (rule, value, callback) => {

    //const form = this.props.form;
    if (value && value.indexOf("-") > -1) {
      callback('Please enter amount greater than 100');
    }
    if (value && value.indexOf(".") > -1) {
      callback('Please enter amount greater than 100');
    }
    if (value.length < 3) {
      callback('Please enter amount greater than 100');
    } 
    else {
      callback();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.props.view_job_reducer;
    const { TextArea } = Input;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="Add Milestone"
          className="add-milestone-popup"
          centered
          confirmLoading={confirmLoading}
          visible={visible}
          onOk={() => this.setModalMilestones(false)}
          onCancel={() => this.setState({ visible: false }) }
          footer={[
          <Form key="modal-form-pm" onSubmit={this.handleSubmit}>
            <FormItem label="Milestone Description">
              {getFieldDecorator('description', {
              rules: [{
              required: true, message: 'Please input description'
              }, {max: 400, message: 'Please enter less text for description'}]
              })(<TextArea autosize={{ minRows: 3, maxRows: 3 }} />)}
            </FormItem>
            <div className="milestone-row">
              <div className="milestone-column">
                <FormItem label="Deposit Amount">
                  {getFieldDecorator('price', { 
                  rules: [{
                  required: true, message: 'Please input price'
                  } ]
                  })(<Input size="large" addonBefore="$" max={job.minimum_budget} />)}
                </FormItem>
              </div>
              <div className="milestone-column add">
                <FormItem label="Expected Date">
                  {getFieldDecorator('closing_date',{
                    initialValue: moment().endOf('day').add(2, 'days')
                  }
                  )(<DatePicker size="large" disabledDate={this.disabledDate}/>)}
                </FormItem>
              </div>
            </div>
            <Form.Item className="milestone-button-holder">
              <Button size="large" onClick={this.props.toggleForm}>Cancel</Button>
              <Button size="large" type="primary" htmlType="submit" loading={confirmLoading}>Add</Button>
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
	accepted_freelancers_reducer: state.accepted_freelancers_reducer,
	view_job_reducer: state.job_view_reducer,
	toggleForm: ownProps.cancelFunc,
	modal_milestones: ownProps.modal_milestones,
  job_milestone_reducer: state.job_milestones_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
	addMilestone: (job_id, data) => (dispatch(jmActions.add(job_id, data))),
  fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),
  };
}

const wrappedProjectMilestoneForm = Form.create()(ProjectMilestoneForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedProjectMilestoneForm);
