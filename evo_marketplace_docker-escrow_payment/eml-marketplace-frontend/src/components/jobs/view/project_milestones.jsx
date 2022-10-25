import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jmActions from './../../../actions/job_milestones';
import ProjectMilestoneForm from './project_milestone_form';
import moment from 'moment';
import { Button, Modal } from 'antd';
// import paid_image from './../../../images/ic_wallet_02.png';
// import calender_image from './../../../images/ic_calendar.png';

class ProjectMilestones extends Component {
  state = {
    showProjectMilestoneForm: false,
    modal_milestones: false,
  }
  componentWillMount() {
    this.props.fetchJobMilestones(this.props.job_id);
  }
  toggleForm(e) {
    e.preventDefault();
    this.setState({
      showProjectMilestoneForm: !this.state.showProjectMilestoneForm,
      modal_milestones: !this.state.modal_milestones,
    });
  }

  confirm = (milestone, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to close this milestone?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      onOk(){
        let data = {};
        data["is_delivered"] = true;
        that.props.approveMilestone(that.props.job_id, milestone.id, {project_milestone: data});
      },
      onCancel(){

      }
    });
  }
  render(){
    const { job_milestones } = this.props.job_milestone_reducer;
    const { job, currentUser } = this.props;
    return (
        <div className="milestone-holder">
          <ul>
          {job_milestones.map((milestone, index) => (
            <li key={index}>
              <div className="milestone-item">
                <h2>Milestone {index + 1}</h2>
                <p>{milestone.description}</p>
                {milestone.is_delivered === true ?
                  <ul>
                    <li>
                      {/*<img src={paid_image} alt="User img" />*/}
                      <span>${milestone.price.fractional/100} - Paid to {milestone.user_full_name}</span>
                    </li>
                    <li>
                      {/*<img src={calender_image} alt="User img" />*/}
                      <span>{ milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
                    </li>
                  </ul>
                  : 
                  <ul>
                    <li>
                      {/*<img src={paid_image} alt="User img" />*/}
                      <span>${milestone.price.fractional/100} -  Deposited into Escrow</span>
                    </li>
                    <li>
                      {/*<img src={calender_image} alt="User img" />*/}
                      <span>{ milestone.created_at ? moment(milestone.created_at).format("DD/MM/YYYY") : '' }</span>
                    </li>
                  </ul>
                  }
              </div>
                   { job.user_id === currentUser.id && job.state === 'active' && milestone.is_delivered === false ?
                    <Button className="approved-btn" type="primary" size="large" onClick={this.confirm.bind(this, milestone)}>Approve and Pay</Button>
                    : ""
                    }
            </li>
            ))}
          </ul>
            { this.state.showProjectMilestoneForm ? <ProjectMilestoneForm cancelFunc={this.toggleForm.bind(this)} modal_milestones={this.state.modal_milestones} /> : ''}
            { job.user_id === currentUser.id && job.state === 'active' ?
              <a onClick={this.toggleForm.bind(this)}>Add milestone</a>
            : '' }
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
    approveMilestone: (job_id, milestone_id, data) => (dispatch(jmActions.update(job_id, milestone_id, data))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMilestones);
