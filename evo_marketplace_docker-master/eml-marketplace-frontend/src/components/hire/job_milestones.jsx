import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import * as jmActions from './../../actions/job_milestones';
import EditProjectMilestoneForm from './../jobs/view/edit_project_milestone_form';
import JobMilestoneForm from './job_milestone_form';
import moment from 'moment';


class JobMilestones extends Component {
  state = {
	showProjectMilestoneForm: false,
    showEditProjectMilestoneForm: false,
    edit_modal_milestones: false,
    selected_milestone_id: 0,
    selected_milestone_price: 0,
    selected_milestone_description: '',
    selected_milestone_closing_date: '',
    job: this.props.job
  }
  componentWillMount() {
	this.props.fetchJobMilestones(window.location.href.split('/')[4]);
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
	this.props.toggleMilestone(this.state.job.id, milestone.id, {project_milestone: data});
  }
  removeMilestone(obj_job, obj_milestone, e){
	this.props.removeMilestone(obj_job, obj_milestone);
	this.props.fetchJobMilestones(this.state.job.id);
  }

  toggleEditForm(obj_milestone, e) {
    e.preventDefault();
    this.setState({selected_milestone_id: obj_milestone.id});
    this.setState({selected_milestone_description: obj_milestone.description});
    this.setState({selected_milestone_price: obj_milestone.price});
    this.setState({selected_milestone_closing_date: obj_milestone.closing_date});
    this.setState({
      showEditProjectMilestoneForm: !this.state.showEditProjectMilestoneForm,
      edit_modal_milestones: !this.state.edit_modal_milestones,
    });
  }

  render(){

	const { job_milestones } = this.props.job_milestone_reducer;
	const { job } = this.state;

	return (
		<div className='milestone-main-holder'>
			{job_milestones.map((milestone, index) => (
				<div key={index} className='milestone-block'>
					<h2>Title: Milestone {index + 1}</h2>
					<p>{milestone.description}</p>
					<span className="milestone-price">${milestone.price.fractional/100}</span>
					<span className="milestone-due-date">Closing Date: &nbsp; { milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
					<a className="remove-milestone-btn" onClick={this.removeMilestone.bind(this,job.id, milestone.id)}><Icon type="delete" /></a>
                	{ this.state.showEditProjectMilestoneForm ? <EditProjectMilestoneForm cancelFunc={this.toggleEditForm.bind(this)} edit_modal_milestones={this.state.edit_modal_milestones} milestone_id={this.state.selected_milestone_id} milestone_price={this.state.selected_milestone_price} milestone_description={this.state.selected_milestone_description} milestone_closing_date={this.state.selected_milestone_closing_date} job_id={job.id} /> : ''}
                	<a className="edit-milestone-btn" type="primary" onClick={this.toggleEditForm.bind(this, milestone)}><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" /></a>	
				</div>
			))}
			{ this.state.showProjectMilestoneForm ? <JobMilestoneForm cancelFunc={this.toggleForm.bind(this)} job={this.state.job} /> : ''}
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



