import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Rate, Tag, Icon, Modal, Button, Form, Input } from 'antd';
import JobRejectionForm from './../../jobs/job_details/job_rejection_form';
import Defender from './../../../helpers/defender';
import * as fActions from './../../../actions/dashboard/freelancer';
import * as fijActions from './../../../actions/freelancer_invited_jobs';
import * as afActions from './../../../actions/accepted_freelancers';
import * as rfActions from './../../../actions/reject_freelancers';
import moment from 'moment';
import noJobImage from '../../../images/ic_no_jobs.png';

const FormItem = Form.Item;
const { TextArea } = Input;

class InvitedJobs extends Component{

	componentWillMount() {
		this.props.fetchInvitedJobs();
	}

    state = {
		modal_cover_letter: false,
		selected_job_id: '',
		selected_job_title: '',
		selected_job_category: '',
		selected_job_minimum_budget: '',
		loading: false,
		iconLoading: false,
    	modal_job_reject: false,
    	showJobRejectionForm: false,
    	confirmLoading: false
	};

	setModalCoverLetter(modal_cover_letter) {
		this.setState({ modal_cover_letter });
	}

	setModalJobReject(modal_job_reject) {
	this.setState({ modal_job_reject });
	}

	toggleJobRejectionForm(e) {
	  e.preventDefault();
	  this.setState({
	    showJobRejectionForm: !this.state.showJobRejectionForm,
	    modal_job_reject: !this.state.modal_job_reject,
	  });
	}

  	popup_dismissal = (e) => {
    	this.setModalCoverLetter(false);
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

	handleSubmitCoverLetter = (e) => {
	    e.preventDefault();
	    this.setState({ confirmLoading: true });

	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      	let  data = {}
	        data["expected_amount"] = values.expected_amount;
	        data["expected_timeline"] = values.expected_timeline;
	        data["cover_letter"] = values.cover_letter;
	        data["user_id"] = Defender.currentUser().id;
	        data["job_id"] = this.state.selected_job_id;
	        this.props.saveJobCoverLetter(data).then((res) => {
	          this.popup_dismissal();
	          this.props.fetchInvitedJobs();
	          this.setState({ confirmLoading: false });
	          if (!this.props.freelancer_dashboard_reducer.success) {
	          }
	        });
	      } else {
	      	this.props.fetchInvitedJobs();
	      	this.setState({ confirmLoading: false });
	      }
	    });
	}

	handleCancel = (e) => {
		this.setModalCoverLetter(false);
	}

	custom_click(obj_job, e) {
		this.setModalCoverLetter(true);
		this.setState({selected_job_id: obj_job.id});
		this.setState({selected_job_title: obj_job.title});
		this.setState({selected_job_category: obj_job.job_category});
		this.setState({selected_job_minimum_budget: obj_job.minimum_budget});
	}

	enterLoading = () => {
		this.setState({ loading: !this.state.loading });
	}
	
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
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
		const { invited_jobs } = this.props.freelancer_invited_jobs_reducer;
		const { getFieldDecorator } = this.props.form;
		return(
			<React.Fragment>
				{ invited_jobs && invited_jobs.length > 0 ? 
					<div className="freelancer-block-holder">
						<div className="heading-block">
							<h2>Invited Jobs</h2>
						</div>
						<React.Fragment>
							{ invited_jobs && invited_jobs.map((val, index) => (
								<div className="body-block" key={index}>
									<a href={'/job_details/'+ val.id} >
										<div className="block-title">
											<h3>{val.title}</h3>
											<span className="price-span">${val.minimum_budget}</span>
										</div>
										<span className="category-span">Category: {val.job_category}</span>
									</a>
									<ul>
										<li><Icon type="clock-circle" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>{moment(val.created_at).fromNow()}</span></li>
										<li><Icon type="user" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>{val.user_country}</span><Rate style={{fontSize:'12px'}} disabled defaultValue={val.average_job_rating_for_all_jobs_for_job_client} /></li>
									</ul>
										<div className="tag-list-holder">
											{val.skill_list && val.skill_list.length > 0 ?
											<ul>
												{ val.skill_list && val.skill_list.map((value, index) => (
													<li key={index}><Tag>{value}</Tag></li>
												))}
											</ul>
											: "" }
											{!!val.get_cover_letter ? "" :
												<React.Fragment>
													{ val.state === "open" ?
														<Button className="filled-btn" onClick={this.custom_click.bind(this,val)} >Apply</Button>
													: "" }
												</React.Fragment>
											}
											{ val.state === "invited" ?
												<React.Fragment>
			                          				{ this.state.showJobRejectionForm ? <JobRejectionForm cancelFunc={this.toggleJobRejectionForm.bind(this)} modal_job_reject={this.state.modal_job_reject} job={val}/> : ''}
													<Button className="filled-btn" onClick={this.confirm_accept.bind(this, Defender.currentUser(), val)}>Accept Offer</Button>
			                         				<Button className="reject-btn" size="large"  onClick={this.toggleJobRejectionForm.bind(this)}>Reject Offer</Button>
												</React.Fragment>
											: "" }
										</div>
									<div className="body-detail">
										<p>{val.description}{/*<a href="">more</a>*/}</p>
									</div>
									{ val.state === "invited" ?
					                  <div className="custom-pending-approval-holder">
					                    <h4>Please accept job offer, job has not officially started until offer has been accepted</h4> 
					                  </div>
					                : "" }
									{ val.state === "open" && val.get_cover_letter.cover_letter !== undefined && val.get_cover_letter.cover_letter !== ""  ?
					                  <div className="custom-pending-approval-holder">
					                    <h4>Proposal submitted</h4> 
					                  </div>
					                : "" }
								</div>
							))}
					          <Modal
					            centered
					            className="apply-job-popup-holder"
					            width='720px'
					            confirmLoading={this.confirmLoading}
					            visible={this.state.modal_cover_letter}
					            onOk={() => this.setModalCoverLetter(false)}
					            onCancel={() => this.setModalCoverLetter(false)}
					            footer={[
					            <Form key={5} className="freelancer-job-detail-form" onSubmit={this.handleSubmitCoverLetter}>
					              <div className="job-detail-form-row">
					                    <FormItem label="Proposed Budget">
					                    {getFieldDecorator('expected_amount',{
					                        rules: [{
					                            required: true, message: 'Please enter estimated budger in $'
					                        },{ validator: this.check_minimum_budget }]
					                    })(
					                    <Input type="number" addonBefore="$" placeholder="Minimum posted budget should be more then $100" />
					                    )}
					                    </FormItem>
					              </div>
					              <div className="job-detail-form-row">
					                    <FormItem label="Estimated Completion Duration">
					                    {getFieldDecorator('expected_timeline',{
					                        rules: [{
					                            required: true, message: 'Please enter estimated time in number of weeks'
					                        }, {message: 'Please input numbers' }]
					                    })(
					                      <Input type="number" addonBefore="Week" />
					                    )}
					                    </FormItem>
					              </div>
					              <div className="job-detail-form-row">
					                    <FormItem label="Cover Letter">
					                    {getFieldDecorator('cover_letter',{
					                        rules: [{
					                            required: true, message: 'Please fill job cover letter'
					                        }, {max: 1500, message: 'Please enter less text for cover letter'}]
					                    })(
					                      <TextArea rows={4} />
					                    )}
					                    </FormItem>
					              </div>
					              <Button key="back" onClick={this.handleCancel}>Cancel</Button>
					              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleOk} loading={this.confirmLoading}>Apply</Button>
					            </Form>
					            ]}
					          >
					            <div className="popup-content-holder">
					              <h2>{this.state.selected_job_title}</h2>
					              <ul>
					                <li>Category: {this.state.selected_job_category}</li>
					                <li>Max. Budget : ${this.state.selected_job_minimum_budget}</li>
					              </ul>
					            </div>
					          </Modal>
						</React.Fragment>
					</div>
				:
					<div className="no-job-freelancer-block-holder">
						<div className="image-holder">
							<img src={noJobImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<h2>You don't have any job invitation yet</h2>
					</div>

				}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    freelancer_invited_jobs_reducer: state.freelancer_invited_jobs_reducer,
    freelancer_dashboard_reducer: state.freelancer_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {

  	saveJobCoverLetter: (data) => (dispatch(fActions.create_job_letter({job_cover_letter: data}))),

	fetchInvitedJobs: () => (dispatch(fijActions.fetch())),

    acceptFreelancers: (job_id, data) => {
      return dispatch(afActions.acceptFreelancers(job_id, data))
    },

    rejectFreelancers: (job_id, data) => {
      return dispatch(rfActions.rejectFreelancers(job_id, {job: data}))
    },

   }
}


const InvitedJobsForm = Form.create()(InvitedJobs);
export default connect(mapStateToProps, mapDispatchToProps)(InvitedJobsForm);