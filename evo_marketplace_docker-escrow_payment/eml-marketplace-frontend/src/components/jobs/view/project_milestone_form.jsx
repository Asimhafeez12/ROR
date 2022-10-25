import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import * as jmActions from './../../../actions/job_milestones';
const FormItem = Form.Item;

class ProjectMilestoneForm extends Component {
  state = {
	confirmDirty: false,
	modal_milestones: this.props.modal_milestones
  }
  setModalMilestones(modal_milestones) {
	this.setState({ modal_milestones });
  }
  handleSubmit = (e) => {
	e.preventDefault();

	const { job } = this.props.view_job_reducer;
	const { accepted_freelancers } = this.props.accepted_freelancers_reducer;
	this.props.form.validateFieldsAndScroll((err, values) => {
	  if (!err) {
		values["user_id"] = accepted_freelancers[0].user_id
		this.props.addMilestone(job.id, {project_milestone: values});
		this.setState({
		  modal_milestones: false,
		});
	  }

	});
  }
  onChange = (val, e) => {
	this.props.form.setFieldsValue({
	  user_id: val
	});
  }
  render() {
	const { getFieldDecorator } = this.props.form;
	const { job } = this.props.view_job_reducer;
	const { TextArea } = Input;

	return (
	  <div>
		<Modal
			title="Add Milestone"
			className="add-milestone-popup"
			centered
			visible={this.state.modal_milestones}
			onOk={() => this.setModalMilestones(false)}
			onCancel={() => this.setModalMilestones(false)}
			footer={[
			<Form key="modal-form-pm" onSubmit={this.handleSubmit}>
				<FormItem label="Milestone Description">
					{getFieldDecorator('description', {
					rules: [{
					required: true, message: 'Please input description'
					}]
					})(<TextArea autosize={{ minRows: 3, maxRows: 3 }} />)}
				</FormItem>
				<div className="milestone-row">
					<div className="milestone-column">
						<FormItem label="Deposit Amount">
							{getFieldDecorator('price', { 
							rules: [{
							required: true, message: 'Please input price'
							}]
							})(<Input size="large" addonBefore="$" min={0} max={job.minimum_budget} />)}
						</FormItem>
					</div>
					<div className="milestone-column add">
						<FormItem label="Expected Date">
							{getFieldDecorator('closing_date',{}
							)(<DatePicker size="large" />)}
						</FormItem>
					</div>
				</div>
				<Form.Item className="milestone-button-holder">
					<Button size="large" onClick={this.props.toggleForm}>Cancel</Button>
					<Button size="large" type="primary" htmlType="submit">Add</Button>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
	addMilestone: (job_id, data) => (dispatch(jmActions.add(job_id, data))),
  };
}

const wrappedProjectMilestoneForm = Form.create()(ProjectMilestoneForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedProjectMilestoneForm);
