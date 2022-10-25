import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Rate, Button, Tabs, Modal} from 'antd';
import * as vActions from './../../../actions/jobs/view';
import InvitedFreelancerList from './invited_freelancer_list';
import ProjectMilestones from './project_milestones';
import JobRating from './job_rating';
import JobInfo from './job_info';
//import BonusForm from './bonus';
import moment from 'moment';
import Defender from './../../../helpers/defender';
import * as acceptedFreelancerActions from './../../../actions/accepted_freelancers';
import * as icjActions from './../../../actions/invited_completed_jobs';
import * as cjrActions from './../../../actions/client_job_ratings';
import * as fjrActions from './../../../actions/freelancer_job_ratings';
import FreelancerImage from './../../../images/freelancer_default.png';
import ClientImage from './../../../images/client_default.png';


class ViewJob extends Component {

  state = {
    modal_cover_letter: false,
    showJobApplicationForm: false,
    modal_end_job: false,
    selected_job_id: '',
    selected_job_title: '',
    selected_job_category: '',
    selected_job_minimum_budget: '',
    loading: false,
    iconLoading: false,
    modal_bonus: false,
    showBonusForm: false,
  };

  handleChange = (value) => {
    this.setState({ value });
  }

  toggleBonusForm(e) {
    e.preventDefault();
    this.setState({
      showBonusForm: !this.state.showBonusForm,
      modal_bonus: !this.state.modal_bonus,
    });
  }

  componentWillMount() {
    this.props.fetchViewJob(this.props.id);
    this.props.getFreelancerJobRating(this.props.id, 0);
    this.props.getClientJobRating(this.props.id, 0);
    if(Defender.currentUser()._r.includes("client")){
      this.props.getAcceptedFreelancer(this.props.id);
    }
  }
  canViewJob = () => {
    return false;
  }

  popup_dismissal = (e) => {
    this.setModalEndJob(false);
    this.props.fetchViewUser(Defender.currentUser().id);
  }


  setModalEndJob(modal_end_job) {
    this.setState({ modal_end_job });
  }

  end_job_click(obj_job, e) {
    this.setState({selected_job_id: obj_job.id});
    this.setState({selected_job_title: obj_job.title});
    this.setModalEndJob(true);
  }

  submitEndJobForm = (e) => {
    //this.props.acceptJob(this.state.selected_job_id);
    this.setModalEndJob(false);
    window.location = '/job/' + this.state.selected_job_id;
  }

  confirm = (obj_job, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to close this job?',
      content: 'By accepting, you will agree to the Terms & Conditions of Wurker.ai.',
      onOk(){
        window.location = '/add_review_rating/' + obj_job.id;
      }
    });
  }

  confirm_check = (obj_job, e) => {
    const that = this;
    Modal.error({
      title: 'You have milestones remaining that are not completed.',
      content: 'Please complete remaining milestones to close this job',
      onOk(){
      }
    });
  }

  render() {
    document.body.classList.add('custom-new-job-detail-page');
    const { job } = this.props.view_job_reducer;
    const {client_job_rating } = this.props.client_job_rating_reducer;
    const {freelancer_job_rating } = this.props.freelancer_job_rating_reducer;
    const TabPane = Tabs.TabPane
    return (
      <React.Fragment>
        { job && Defender.currentUser()._r.includes("client") || Defender.currentUser()._r.includes("freelancer")  ?
          <div className="custom-new-job-detail-holder">
            <div className="custom-new-job-detail-heading">
              <div className="left-heading">
                <h1>{job.title}</h1>
                <ul>
                  { job.state === "open" || job.state === "invited" || job.state === "active"  ?
                    <li>
                      <strong>Job Category: </strong>
                      <span>{job.job_category}</span>
                    </li>
                  : "" }
                  <li>
                    {job.state === "open" || job.state === "invited" ?
                      <React.Fragment>
                        <strong>Posted on: </strong>
                        <span><time>{job.created_at_format}</time></span>
                      </React.Fragment>
                    : ""
                    }
                  </li>
                  <li>
                    {job.state === "active" || job.state === "completed" ?
                      <React.Fragment>
                        <strong>Started on: </strong>
                        <span><time>{job.starting_date}</time></span>
                      </React.Fragment>
                    : ""
                    }
                  </li>
                  <li>
                    {job.state === "open" || job.state === "invited" ?
                      <React.Fragment>
                        <strong>Max Budget: </strong>
                        <span>${job.minimum_budget}</span>
                      </React.Fragment>
                    : ""
                    }
                  </li>
                  {((Defender.currentUser().id === job.user_id || job.cvpm) && (job.state === 'completed')) ?
                    <React.Fragment>
                      <li>
                        <strong>Closed on :</strong>
                        <span>{moment(job.closing_date).format('MM/DD/YYYY')}</span>
                      </li>
                    </React.Fragment>
                  : "" }
                  { job.state === 'completed' || job.state === "active" ?
                    <React.Fragment>
                      <li>
                        <strong>Total paid :</strong>
                        <span>${job.amount_paid_for_completed_milestones/100}</span>
                      </li>
                    </React.Fragment>
                  : "" }

                  {((Defender.currentUser().id === job.user_id || job.cvpm) && Defender.currentUser()._r.includes("client") && job.state === 'completed') ?
                    <li>
                      <strong>Rating Received :</strong>
                      <span></span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={client_job_rating.rounded_overall_rating} />
                      {client_job_rating.rounded_overall_rating && <span className="ant-rate-text">({parseInt(client_job_rating.rounded_overall_rating)})</span>}
                    </li>
                  : "" }
                  {((Defender.currentUser()._r.includes("freelancer") || job.cvpm) && job.state === 'completed') ?
                    <React.Fragment>
                      {client_job_rating.review  ?
                        <li>
                          <strong>Rating Received :</strong>
                          <span></span>
                          <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.rounded_overall_rating} />
                          {freelancer_job_rating.rounded_overall_rating && <span className="ant-rate-text">({parseInt(freelancer_job_rating.rounded_overall_rating)})</span>}
                        </li>
                      : "" }
                    </React.Fragment>
                  : "" }
                </ul>
              </div>

              {job.state === "open" && job.user_id === Defender.currentUser().id && job.job_cover_letter_count === 0 ?
                  <div className="right-heading">
                      <React.Fragment>
                          <Button href={'/edit_job/'+ job.id} size="large" className="edit-job-btn outline-btn">Edit Job</Button>
                      </React.Fragment>
                  </div>
              : null}
              {(Defender.currentUser().id === job.user_id || job.cvpm) && (job.state === "active" || job.state === "completed") && Defender.currentUser()._r.includes("client")  ?
                <div className="right-heading">
                  <div className="image-holder">
                      <a href={'/profile/'+ job.accept_freelancers_list[0].user_id} >
                        {!!job.accept_freelancers_list[0].user_avatar_url ?
                          <React.Fragment>
                              <img src={job.accept_freelancers_list[0].user_avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                          </React.Fragment>
                          :
                          <img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                        }
                      </a>
                  </div>
                  <div className="user-content">
                    <div className="user-data">
                        <a href={'/profile/'+ job.accept_freelancers_list[0].user_id}>
                          <strong>Engineer Hired</strong>
                          <span>{job.accept_freelancers_list[0].user_full_name}</span>
                        </a>
                    </div>
                    {/*  {job.state === "completed" && Defender.currentUser()._r.includes("client") ?
                      <div className="buttons-holder">
                      { this.state.showBonusForm ? <BonusForm cancelFunc={this.toggleBonusForm.bind(this)} modal_bonus={this.state.modal_bonus} job={job}/> : ''}
                      {Defender.currentUser().id === job.user_id ? 
                      <Button type="primary" size="large" onClick={this.toggleBonusForm.bind(this)}>Give Bonus</Button>
                      : "" }
                      </div>
                    : "" }*/}
                    {job.state === "active" && Defender.currentUser().id === job.user_id && Defender.currentUser()._r.includes("client") && job.open_milestones_count === 0 ? 
                      <div className="buttons-holder">
                        <Button type="primary" size="large" onClick={this.confirm.bind(this, job)} >End Job</Button>
                      </div>
                    : "" }
                    {job.state === "active" && Defender.currentUser().id === job.user_id && Defender.currentUser()._r.includes("client") && job.open_milestones_count > 0 ? 
                      <div className="buttons-holder">
                        <Button type="primary" size="large" onClick={this.confirm_check.bind(this, job)} >End Job</Button>
                      </div>
                    : "" }
                  </div>
                </div>
                :  ""
              }
              <React.Fragment>
                {(job.cvpm) && (job.state === "active" || job.state === "completed") && Defender.currentUser()._r.includes("freelancer")  ?
                  <div className="right-heading">
                    <a href={'/profile/'+ job.user_id} >
                      <div className="image-holder">
                        {!!job.user_avatar_url ?
                          <React.Fragment>
                              <img src={job.user_avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                          </React.Fragment>
                          :
                          <img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                        }
                      </div>
                    </a>
                    <div className="user-content">
                      <a href={'/profile/'+ job.user_id}>
                        <div className="user-data">
                          <strong>Client</strong>
                            <span>{job.user_full_name}</span>
                        </div>
                      </a>
                        {job.state === "completed" && Defender.currentUser()._r.includes("freelancer") ?
                          <React.Fragment>
                            {!! client_job_rating ?
                              "" :
                              <div className="buttons-holder"> 
                                <Button type="primary" size="large" href={"/add_review_rating/" + job.id}>Rate Client</Button>
                              </div>
                            }
                          </React.Fragment>
                        : ""
                        }
                    </div>
                  </div>
                : "" }
              </React.Fragment>
            </div>

            <div className="custom-new-job-detail-body">
                <React.Fragment>
                  {job.get_rejected_freelancer !== false && Defender.currentUser()._r.includes("client") && job.state === 'open' ? 
                    <p>Job Rejection Reason: {job.get_rejected_freelancer.description}</p>
                  : "" }
                </React.Fragment>

                { job.is_approved && Defender.currentUser().id === job.user_id && (job.state === 'open') && job.job_cover_letter_count > 0 ? <InvitedFreelancerList job={job} /> : '' }


                {((Defender.currentUser().id === job.user_id || job.cvpm || job.accepted_freelancer_ids && job.accepted_freelancer_ids.includes(Defender.currentUser().id)) && job.state === 'completed') ?
                  <div className="custom-job-details-row">
                    <div className="tabs-holder">
                      <Tabs defaultActiveKey="1" >
                        <TabPane tab="Milestones" key="1"><ProjectMilestones job={job} /></TabPane>
                        <TabPane tab="Job Info" key="2"><JobInfo job={job}/ ></TabPane>
                        <TabPane tab="Rating & Review" key="3"><JobRating job={job} /></TabPane>
                      </Tabs>
                    </div>
                  </div>
                  : "" }
                {((Defender.currentUser().id === job.user_id || job.cvpm || job.accepted_freelancer_ids && job.accepted_freelancer_ids.includes(Defender.currentUser().id)) && (job.state === 'active' || job.state === "invited")) ?
                  <div className="custom-job-details-row">
                    <div className="tabs-holder">
                      <Tabs defaultActiveKey="1" >
                        <TabPane tab="Milestones" key="1"><ProjectMilestones job={job} /></TabPane>
                        <TabPane tab="Job Info" key="2"><JobInfo job={job}/ ></TabPane>
                      </Tabs>
                    </div>
                  </div>
                  : "" }              

                <React.Fragment>
                  {job.state === "open" && Defender.currentUser()._r.includes("client") && job.job_cover_letter_count === 0 ?
                  <div className="custom-pending-approval-holder">
                    <h4>Pending approval and recommendations</h4> 
                  </div>
                  : ""}
                </React.Fragment>
                  {job.state === "open" && job.job_cover_letter_count === 0 ?
                    <React.Fragment>
                      <div className="custom-job-details-row">
                          <h2>Job Description</h2>
                          <p>{job.description}</p>
                      </div>
                      <div className="custom-job-details-row">
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
                      {job.additional_info !== null  ?
                        <div className="custom-job-details-row">
                            <h2>Additional Information</h2>
                            <p>{job.additional_info}</p>
                        </div>
                      : "" }                     
                      <div className="custom-job-details-row">
                          <h2>Required Skills</h2>
                          <div className="required-skills-block">
                            <ul>
                            { job.skill_list && job.skill_list.map((val, index) => (
                                <li key={index}>{val}</li>
                              ))}
                            </ul>
                          </div>
                      </div>
                      <div className="custom-job-details-row">
                        <div className="custom-job-details-bottom">
                          <ul>
                              <li>
                                <strong>Starting Date</strong>
                                <span>{job.starting_date}</span>
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
                      </div>
                  </React.Fragment>
                : "" }
            </div>
          </div>
         : "" }


         <div className="popups">
            <Modal
              title=""
              centered
              visible={this.state.modal_end_job}
              onOk={() => this.setModalEndJob(false)}
              onCancel={() => this.setModalEndJob(false)}
              footer={[
              <Form key={4} className="job-post-form" onSubmit={this.submitEndJobForm}>
                <h2>{this.state.selected_job_title}</h2>
                <h3>Do you want to complete all open milestones for this job?</h3>
                <Button key="back" onClick={this.handleCancel}>Cancel</Button>
                     <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Yes</Button>
              </Form>
                ]}
            >
            </Modal>
         </div>   


       </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    view_job_reducer: state.job_view_reducer,
    id: ownProps.match.params.id,
    freelancer_dashboard_reducer: state.freelancer_reducer,
    freelancer_job_rating_reducer: state.freelancerjobRatingReducer,
    client_job_rating_reducer: state.clientjobRatingReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    },

    acceptJob: (job_id) => {
      return dispatch(icjActions.AcceptJobs(job_id))
    },
    getClientJobRating: (job_id, user_id) => (dispatch(cjrActions.fetch(job_id, user_id))),

    getFreelancerJobRating: (job_id, user_id) => (dispatch(fjrActions.fetch(job_id, user_id))),

    getAcceptedFreelancer: (id) => (dispatch(acceptedFreelancerActions.fetch(id)))

  }
}

const ViewJobForm = Form.create()(ViewJob);
export default connect(mapStateToProps, mapDispatchToProps)(ViewJobForm);
