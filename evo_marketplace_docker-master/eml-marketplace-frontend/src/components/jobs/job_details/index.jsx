import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Rate, Icon, Tag, Modal } from 'antd';
import JobApplicationForm from './job_application_form';
import JobRejectionForm from './job_rejection_form';
import * as userActions from './../../../actions/users';
import * as vActions from './../../../actions/jobs/view';
import * as jmActions from './../../../actions/job_milestones';
import * as afActions from './../../../actions/accepted_freelancers';
//import * as rfActions from './../../../actions/reject_freelancers';
import Defender from './../../../helpers/defender';
import moment from 'moment';
import ClientImage from './../../../images/client_default.png';
import paid_image from './../../../images/ic_wallet_02.png';
import calender_image from './../../../images/ic_calendar.png';


class JobDetails extends Component {
  state = {
    value: 0,
    modal_cover_letter: false,
    showJobApplicationForm: false,
    modal_job_reject: false,
    showJobRejectionForm: false,
    confirmLoading: false
  }


  componentWillMount() {
    this.props.fetchViewUser(Defender.currentUser().id);
    this.props.fetchViewJob(window.location.href.split('/')[4]);
    this.props.fetchJobMilestones(window.location.href.split('/')[4]);
  }

  setModalCoverLetter(modal_cover_letter) {
    this.setState({ modal_cover_letter });
  }

  setModalJobReject(modal_job_reject) {
    this.setState({ modal_job_reject });
  }

  handleCancel = (e) => {
    this.setModalCoverLetter(false);
  }

  toggleJobRejectionForm(e) {
      e.preventDefault();
      this.setState({
        showJobRejectionForm: !this.state.showJobRejectionForm,
        modal_job_reject: !this.state.modal_job_reject,
      });
  }

  toggleJobApplicationForm(e) {
      e.preventDefault();
      this.setState({
        showJobApplicationForm: !this.state.showJobApplicationForm,
        modal_cover_letter: !this.state.modal_cover_letter,
      });
  }

  acceptFreelancer = (obj_user, obj_job, e) => {
      this.setState({ confirmLoading: true });
      const value = []; value.push(obj_user.id);
      const values = value.map((val) => ( {user_id: val}));
        this.props.acceptFreelancers(obj_job.id, {job: {state_event: "active", accept_freelancers_attributes: values}}).then((res) => {
          this.setState({ confirmLoading: false });
          window.location = '/job/' + obj_job.id;
        });
  }


  confirm_accept = (obj_user, obj_job, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to accept this job offer',
      content: 'By accepting, you will agree to the Terms & Conditions of Wurker.ai.',
      onOk(){
        that.acceptFreelancer(obj_user, obj_job)
      }
    });
  }


  render(){
    const { job } = this.props.view_job_reducer;
    const { user } = this.props.user_view_reducer; 
    const { job_milestones } = this.props.job_milestone_reducer;
    return (
            <div className="freelancer-job-detail-page">
              <main className="job-detail-main">
                <aside className="job-detail-sidebar">
                  <div className="job-detail-sidebar-block">
                  {(job && user.job_cover_letters && user.job_cover_letters.includes(job.id)) || job.state !== "open" ?
                    <React.Fragment> 
                      {job.state === "invited" ?
                        <React.Fragment>
                          <Button className="filled-btn" onClick={this.confirm_accept.bind(this, Defender.currentUser(), job)}>Accept Offer</Button>
                          { this.state.showJobRejectionForm ? <JobRejectionForm cancelFunc={this.toggleJobRejectionForm.bind(this)} modal_job_reject={this.state.modal_job_reject} job={job}/> : ''}
                          <Button className="reject-btn" size="large"  onClick={this.toggleJobRejectionForm.bind(this)}>Reject Offer</Button>

                        </React.Fragment>
                      :
                        <Button className="filled-btn disabled-btn" disabled>Apply</Button>
                      }
                    </React.Fragment>
                    :
                    <React.Fragment>
                      { this.state.showJobApplicationForm ? <JobApplicationForm cancelFunc={this.toggleJobApplicationForm.bind(this)} modal_cover_letter={this.state.modal_cover_letter} job={job}/> : ''}
                      <Button className="filled-btn"  onClick={this.toggleJobApplicationForm.bind(this)}>Apply</Button>
                    </React.Fragment>
                  }
                    <div className="max-budget-block">
                      <p>Max. Budget<span className="price-span">${job.minimum_budget}</span></p>
                    </div>
                  </div>
                  {job.job_client ?
                    <div className="job-detail-sidebar-block">
                      <h3>About Client</h3>
                      <div className="client-data-holder">
                        <div className="client-image-holder">
                            {!!job.job_client.avatar_url ?
                                <React.Fragment>
                                  <img src={job.job_client.avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                                </React.Fragment>
                               :
                                <img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                            }
                        </div>
                        <div className="client-data">
                          <strong>{job.job_client.full_name}</strong>
                          <div className="client-rating-holder">
                            <Rate style={{fontSize:'12px'}} disabled value={job.average_job_rating_for_all_jobs_for_job_client} defaultValue={job.average_job_rating_for_all_jobs_for_job_client} />
                            <span>({job.average_job_rating_for_all_jobs_for_job_client})</span>
                          </div>
                          {job.job_client.country || job.job_client.city ?
                            <span className="client-address"><Icon type="environment" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} />{job.job_client.city} {job.job_client.country}</span>
                          : "" }
                        </div>
                      </div>
                      <ul className="more-details"> 
                        {job.job_client.payment_verified ?
                          <li><span className="custom-tick-icon"></span>Payment verified</li>
                        : "" }
                        <li>{job.job_client.jobs_count} Jobs posted</li>
                        {job.job_client.freelancers_hired_count && job.job_client.freelancers_hired_count > 0 ?
                          <li>{job.job_client.freelancers_hired_count} Total hired</li>
                        : "" }
                        <li>${job.job_client.total_amount_spent} Total spent</li>
                      </ul>

                      <span className="member-date">Member since {job.job_client.member_since}</span>
                      <span className="job-posted-date">This job was posted {moment(job.created_at).fromNow()}</span>
                    </div>
                  : "" }
                </aside>
                <div className="job-detail-main-holder custom1">
                  <div className="heading-block">
                    {job.state === "open" ?
                      <h2>Job Invitation</h2>
                    : <h2>Job Offer</h2>
                    }
                  </div>
                  <div className="body-block">
                    <div className="block-title">
                        <h3>{job.title}</h3>
                        <span className="category-span">Category: {job.job_category}</span>
                    </div>

                    <div className="job-details">
                        <div className="job-details-row">
                            <h3>Job Details</h3>
                            <p>{job.description}</p>
                        </div>

                        {job.job_files && job.job_files.length > 0 ?
                          <div className="uploaded-files-list">
                              <ul>
                              { job.job_files && job.job_files.map((val, index) => (
                                <li key={index}>
                                  <a href={val.avatar.url} target="_blank">
                                    <React.Fragment>{val.avatar.url.replace(/^.*[\\\/]/, '')}</React.Fragment>
                                  </a>
                                </li>
                              ))}
                              </ul>
                          </div>
                        : null }

                        {job_milestones && job_milestones.length > 0 ?
                          <div className="milestone-block-row">
                              <h2>Milestone(s)</h2>
                              <ul>
                                  {job_milestones.map((milestone, index) => (
                                <li key={index}>
                                  <div className="milestone-item">
                                    <h4>Milestone {index + 1}</h4>
                                    {milestone.is_delivered === true ?
                                      <ul>
                                        <li>
                                          <div className="milestone-list-icon">
                                              <img src={paid_image} alt="User img" />
                                          </div>
                                          <span>${milestone.price.fractional/100}</span>
                                        </li>
                                        <li>
                                          <div className="milestone-list-icon">
                                              <img src={calender_image} alt="User img" />
                                          </div>
                                          <span>{ milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
                                        </li>
                                      </ul>
                                      : 
                                      <ul>
                                        <li>
                                          <div className="milestone-list-icon">
                                              <img src={paid_image} alt="User img" />
                                          </div>
                                          <span>${milestone.price.fractional/100}</span>
                                        </li>
                                        <li>
                                          <div className="milestone-list-icon">
                                              <img src={calender_image} alt="User img" />
                                          </div>
                                          <span>{ milestone.created_at ? moment(milestone.created_at).format("DD/MM/YYYY") : '' }</span>
                                        </li>
                                      </ul>
                                      }
                                      <p>{milestone.description}</p>
                                  </div>

                                </li>
                                ))}
                              </ul>
                          </div>
                        : "" }

                        {job.skill_list && job.skill_list.length > 0 ?
                          <div className="tag-list-holder">
                            <h2>Required Skills</h2>
                            <ul>
                            { job.skill_list && job.skill_list.map((val, index) => (
                              <li key={index}><Tag>{val}</Tag></li>
                            ))}
                            </ul>
                          </div>
                        : "" }
                        <div className="detail-listing">
                          <ul>
                            <li>
                              <strong>Starting Date</strong>
                              <span>{moment(job.starting_date).format('MM/DD/YYYY')}</span>
                            </li>
                            <li>
                              <strong>Availability Required</strong>
                              <span>{job.translated_availability}</span>
                            </li>
                            <li>
                              <strong>Expected Duration</strong>
                              <span>{job.translated_duration}</span>
                            </li>
                            <li>
                              <strong>Desired Profile</strong>
                              <span>{job.translated_desired_profile}</span>
                            </li>
                          </ul>
                        </div>
                        <br/>
                        {job && job.job_cover_letter ?
                          <div className="job-details-row">
                              <h3>Proposed Cover Letter</h3>
                              <p>{job.job_cover_letter.cover_letter}</p>
                          </div>
                        : "" }
                        {job && job.job_cover_letter ?
                          <div className="detail-listing">
                            <ul>
                              <li>
                                <strong>Proposed Budget</strong>
                                <span>${job.job_cover_letter.expected_amount}</span>
                              </li>
                              <li>
                                <strong>Proposed Timeline</strong>
                                <span>{job.job_cover_letter.expected_timeline} weeks</span>
                              </li>
                            </ul>
                          </div>
                        : "" }
                    </div>

                  </div>
                </div>
              </main>
            </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    user_view_reducer: state.user_view_reducer,
    view_job_reducer: state.job_view_reducer,
    job_milestone_reducer: state.job_milestones_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchViewUser: (id) => {
      return dispatch(userActions.fetchViewUser(id))
    },
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    },
    fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),

    acceptFreelancers: (job_id, data) => {
      return dispatch(afActions.acceptFreelancers(job_id, data))
    },
    // rejectFreelancers: (job_id, data) => {
    //   return dispatch(rfActions.rejectFreelancers(job_id, {job: data}))
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);