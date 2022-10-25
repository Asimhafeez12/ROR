import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class JobInfo extends Component {
  state = {
    showProjectMilestoneForm: false,
  }
  render() {
    document.body.classList.add('job-info-page');
    const { job } = this.props;
    return (
      <div className="job-info-holder">
        <div className="job-info-top">
          <ul>
            <li>
              <h3>Total Budget</h3>
              <span>${job.minimum_budget/100}</span>
            </li>
            <li>
              <h3>In Escrow</h3>
                {job.amount_remaining_for_open_milestones ? <span>${job.amount_remaining_for_open_milestones/100}</span>
                  : <span>$0.00</span>
                }
            </li>
            <li>
              <h3>Milestones Paid</h3>
                {job.amount_paid_for_completed_milestones ? <span>${job.amount_paid_for_completed_milestones/100}</span>
                  : <span>$0.00</span>
                }
            </li>
            <li>
              <h3>Remaining</h3>
                {job.amount_remaining_for_open_milestones ? <span>${job.amount_remaining_for_open_milestones/100}</span>
                  : <span>$0.00</span>
                }
            </li>
            <li>
              <h3>Total Payments</h3>
                {job.amount_paid_for_completed_milestones ? <span>${job.amount_paid_for_completed_milestones/100}</span>
                  : <span>$0.00</span>
                }
            </li>
          </ul>
        </div>
        <div className="job-info-bottom">
          <h2>Other Details</h2>
          <ul>
            <li>
              <h3>Posted on</h3>
              <span>{moment(job.created_at).format('MM/DD/YYYY')}</span>
            </li>
            <li>
              <h3>Hired on</h3>
              <span>{moment(job.hired_on).format('MM/DD/YYYY')}</span>
            </li>
            <li>
              <h3>Closed on</h3>
              <span>7/10/2018</span>
            </li>
            <li>
              <h3>Job id</h3>
              <span>{job.id}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    job_id: ownProps.job.id,
    job: ownProps.job,
  };
}


export default connect(mapStateToProps)(JobInfo);