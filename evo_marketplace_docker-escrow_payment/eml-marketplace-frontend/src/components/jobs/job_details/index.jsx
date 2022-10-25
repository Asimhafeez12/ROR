import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Rate, Icon, Tag } from 'antd';
import JobApplicationForm from './job_application_form';
import * as userActions from './../../../actions/users';
import * as vActions from './../../../actions/jobs/view';
import Defender from './../../../helpers/defender';
import moment from 'moment';
import ClientImage from './../../../images/client_default.png';

class JobDetails extends Component {
  state = {
    value: 3,
    modal_cover_letter: false,
    showJobApplicationForm: false
  }

  componentWillMount() {
    this.props.fetchViewUser(Defender.currentUser().id);
    this.props.fetchViewJob(window.location.href.split('/')[4]);
  }

  setModalCoverLetter(modal_cover_letter) {
    this.setState({ modal_cover_letter });
  }

  handleCancel = (e) => {
    this.setModalCoverLetter(false);
  }

  toggleJobApplicationForm(e) {
      e.preventDefault();
      this.setState({
        showJobApplicationForm: !this.state.showJobApplicationForm,
        modal_cover_letter: !this.state.modal_cover_letter,
      });
  }

  render(){
    const { job } = this.props.view_job_reducer;
    const { user } = this.props.user_view_reducer; 
    const { value } = this.state;
    return (
            <div className="freelancer-job-detail-page">
              <main className="job-detail-main">
                <aside className="job-detail-sidebar">
                  <div className="job-detail-sidebar-block">
                  {(job && user.job_cover_letters && user.job_cover_letters.includes(job.id)) || job.state !== "open" ? 
                    <Button className="filled-btn disabled-btn" disabled>Apply</Button>
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
                                "" :
                                <img src={ClientImage} alt="User img" />
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
                        <li>$400 Total spent</li>
                      </ul>

                      <span className="member-date">Member since {job.job_client.member_since}</span>
                      <span className="job-posted-date">This job was posted {moment(job.created_at).fromNow()}</span>
                    </div>
                  : "" }
                </aside>
                <div className="job-detail-main-holder">
                  <div className="heading-block">
                    <h2>Job Invitations</h2>
                    <span className="category-span">Category: {job.job_category}</span>
                  </div>
                  <div className="body-block">
                    <div className="block-title">
                      <h3>{job.title}</h3>
                      <p>{job.description}</p>
                    </div>
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
                          <strong>Staring Date</strong>
                          <span>{moment(job.created_at).format('MM/DD/YYYY')}</span>
                        </li>
                        <li>
                          <strong>Availability Required</strong>
                          <span>{job.translated_availability}</span>
                        </li>
                        <li>
                          <strong>Expected Duration</strong>
                          <span>{job.translated_duration}</span>
                        </li>
                      </ul>
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
    view_job_reducer: state.job_view_reducer
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
