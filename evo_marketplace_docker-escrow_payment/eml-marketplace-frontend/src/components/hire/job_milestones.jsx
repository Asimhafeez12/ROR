import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import * as jmActions from './../../actions/job_milestones';
import JobMilestoneForm from './job_milestone_form';
import moment from 'moment';


class JobMilestones extends Component {
  state = {
	showProjectMilestoneForm: false,
  }
  componentWillMount() {
	this.props.fetchJobMilestones(this.props.job_id);
  }
  toggleForm(e) {
	e.preventDefault();
	this.setState({
	  showProjectMilestoneForm: !this.state.showProjectMilestoneForm,
	});
  }
  toggleMilestone = (milestone) => {
	let data = {};
	data["is_delivered"] = !milestone.is_delivered;
	this.props.toggleMilestone(this.props.job_id, milestone.id, {project_milestone: data});
  }
  removeMilestone(obj_job, obj_milestone, e){
	this.props.removeMilestone(obj_job, obj_milestone);
	this.props.fetchJobMilestones(this.props.job_id);
  }
  render(){
	const { job_milestones } = this.props.job_milestone_reducer;
	const { job } = this.props;
	return (
		<div className='milestone-main-holder'>
			{job_milestones.map((milestone, index) => (
				<div key={index} className='milestone-block'>
					<h2>Title: Milestone {index + 1}</h2>
					<p>{milestone.description}</p>
					<span className="milestone-price">${milestone.price.fractional/100}</span>
					<span className="milestone-due-date">Closing Date: &nbsp; { milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
					<a className="remove-milestone-btn" onClick={this.removeMilestone.bind(this,job.id, milestone.id)}><Icon type="delete" /></a>	
				</div>
			))}
			{ this.state.showProjectMilestoneForm ? <JobMilestoneForm cancelFunc={this.toggleForm.bind(this)} /> : ''}
		</div>
	);
  }
}

function mapStateToProps(state, ownProps){
  return {
	job_milestone_reducer: state.job_milestones_reducer,
	job_id: ownProps.job.id,
	job: ownProps.job,
	currentUser: state.auth.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
	fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),
	toggleMilestone: (job_id, milestone_id, data) => (dispatch(jmActions.update(job_id, milestone_id, data))),
	removeMilestone: (job_id, milestone_id) => (dispatch(jmActions.remove(job_id, milestone_id)))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobMilestones);



