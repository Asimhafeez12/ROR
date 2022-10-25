import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Rate, Button } from 'antd';
import ClientImage from '../../images/client_default.png';
import FreelancerImage from '../../images/freelancer_default.png';
import Defender from './../../helpers/defender';

import * as vActions from './../../actions/jobs/view';
import * as arrActions from './../../actions/freelancer_job_ratings'

//import * as fjrActions from './../../actions/freelancer_job_ratings';
//import * as cjrActions from './../../actions/client_job_ratings';

import * as gfrActions from './../../actions/get_freelancer_ratings';
import * as gcrActions from './../../actions/get_client_ratings';

const FormItem = Form.Item;

class AddReviewRating extends Component {


	state = {
		communication_value: 0,
		value_value: 0,
		deadline_value: 0,
		accuracy_value: 0,
		quality_value: 0,
		availability_value: 0,
		value: 0
	}

	componentWillMount() {
	    this.props.fetchViewJob(window.location.href.split('/')[4]);
	    const { job } = this.props.view_job_reducer;
      	this.props.getFreelancerJobRating(window.location.href.split('/')[4], job.accepted_freelancer_id);
      	this.props.getClientJobRating(window.location.href.split('/')[4], job.user_id);
	}

	canViewJob = () => {
	    return false;
	}

	handleChangeCommunication = (communication_value) => {
		const that = this.state;
		this.setState({ communication_value });
        let { total_rating } = 0;
        total_rating = parseFloat((communication_value + that.availability_value + that.deadline_value + that.accuracy_value + that.quality_value + that.value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});
	}

	handleChangeValue = (value_value) => {
		const that = this.state;
		this.setState({ value_value });
        let { total_rating } = 0;
        total_rating = parseFloat((that.communication_value + that.availability_value + that.deadline_value + that.accuracy_value + that.quality_value + value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});
	}

	handleChangeDeadline = (deadline_value) => {
		const that = this.state;
		this.setState({ deadline_value });
        let { total_rating } = 0;
        total_rating = parseFloat((that.communication_value + that.availability_value + deadline_value + that.accuracy_value + that.quality_value + that.value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});

	}

	handleChangeAccuracy = (accuracy_value) => {
		const that = this.state;
		this.setState({ accuracy_value });
        let { total_rating } = 0;
        total_rating = parseFloat((that.communication_value + that.availability_value + that.deadline_value + accuracy_value + that.quality_value + that.value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});
	}

	handleChangeQuality = (quality_value) => {
		const that = this.state;
		this.setState({ quality_value });
        let { total_rating } = 0;
        total_rating = parseFloat((that.communication_value + that.availability_value + that.deadline_value + that.accuracy_value + quality_value + that.value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});
	}

	handleChangeAvailability = (availability_value) => {
		const that = this.state;
		this.setState({ availability_value });
        let { total_rating } = 0;
        total_rating = parseFloat((that.communication_value + availability_value + that.deadline_value + that.accuracy_value + that.quality_value + that.value_value)/6);
		this.setState({ value: parseInt((total_rating.toFixed(2)), 10)});
	}

	handleChange = (value) => {
		this.setState({ value });
	}

  handleSubmit = (obj_job, e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { communication_value } = this.state;
        let { value_value } = this.state;
        let { deadline_value } = this.state;
        let { accuracy_value } = this.state;
        let { quality_value } = this.state;
        let { availability_value } = this.state;
        let { value } = this.state;
        let  data = {}
        data["review"] = values.review;
        data["feedback"] = values.feedback;
         if (Defender.currentUser()._r.includes("client")){
	        data["communication"] = communication_value;
	        data["availability"] = availability_value;
	        data["value"] = value_value;
	        data["deadline"] = deadline_value;
	        data["accuracy"] = accuracy_value;
	        data["quality"] = quality_value;
        	data["user_id"] = obj_job.accepted_freelancer_id;
        	data["overall_rating"] = (communication_value + availability_value + deadline_value + accuracy_value + quality_value + value_value)/6;
        }
        if (Defender.currentUser()._r.includes("freelancer")){
        	data["user_id"] = obj_job.user_id;
        	data["overall_rating"] = value;
        }

        this.props.addReviewRating(obj_job.id, data).then((res) => {
        	window.location = '/job/' + obj_job.id;
        });
      } 
     
    });
  }

	render() {
		//const { value } = this.state;
		const { TextArea } = Input;
		const { getFieldDecorator } = this.props.form;
		const { job } = this.props.view_job_reducer;
    	const {freelancer_job_rating } = this.props.get_freelancer_ratings_reducer;
    	const {client_job_rating } = this.props.get_client_ratings_reducer;
    	if (Defender.currentUser()._r.includes("client") && freelancer_job_rating.review){
    		window.location = '/job/' + window.location.href.split('/')[4];
    	}
    	if (Defender.currentUser()._r.includes("freelancer_job_rating") && client_job_rating.review){
    		window.location = '/job/' + window.location.href.split('/')[4];
    	}
        let { total_rating } = 0;
        let { grand_total_rating } = 0;
        total_rating = parseFloat(((this.state.communication_value + this.state.availability_value + this.state.deadline_value + this.state.accuracy_value + this.state.quality_value + this.state.value_value)/6), 10);
	    grand_total_rating = parseInt((total_rating.toFixed(2)), 10);

		return (
			<div className="add-review-rating-holder">
			<Form key={1} className="job-post-form" onSubmit={this.handleSubmit.bind(this,job)}>
				<div className="add-content-holder">
					<div className="content-top">
						<div className="left-heading">
							<h2>{job.title}</h2>
							<span>Editing Review</span>
						</div>
						{Defender.currentUser()._r.includes("client") ?
							<div className="right-heading">
								<div className="image-holder">
			                      {job && job.accept_freelancers_list && !!job.accept_freelancers_list[0].user_avatar_url ?
			                          <React.Fragment>
			                          	<img src={job.accept_freelancers_list[0].user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                          </React.Fragment>
			                          	:
			                          	<img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                      }
								</div>
								<div className="user-content">
									<div className="user-data">
										<strong>Engineer Hired</strong>
										{ job && job.accept_freelancers_list ?
											<span>{job.accept_freelancers_list[0].user_full_name}</span>
										: "" }
									</div>
								</div>
							</div>
						: 
							<div className="right-heading">
								<div className="image-holder">
			                      {job && !!job.job_client && job.job_client.avatar_url ?
			                          <React.Fragment>
			                          	<img src={job.job_client.avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                          </React.Fragment> 
			                          :
			                          <img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                      }
								</div>
								<div className="user-content">
									<div className="user-data">
										<strong>Client</strong>
										{ job && job.job_client && job.job_client.full_name ?
											<span>{job.job_client.full_name}</span>
										: "" }
									</div>
								</div>
							</div> 
						}
					</div>
					{Defender.currentUser()._r.includes("client") ?
						<React.Fragment>
							<div className="content-middle">
								<h3>How many stars would you like to give this AI Freelancer?</h3>
								<ul>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeCommunication} value={this.state.communication_value} />
										<span className="title">Communication:</span>
									</li>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeAccuracy} value={this.state.accuracy_value} />
										<span className="title">Accuracy:</span>
									</li>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeQuality} value={this.state.quality_value} />
										<span className="title">Quality of work:</span>
									</li>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeValue} value={this.state.value_value} />
										<span className="title">Value:</span>
									</li>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeDeadline} value={this.state.deadline_value} />
										<span className="title">Deadlines:</span>
									</li>
									<li>
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChangeAvailability} value={this.state.availability_value} />
										<span className="title">Availability</span>
									</li>
									<li>
										<div className="rating-block">
											{this.state.value ?
												<span className="rating-block-text">{grand_total_rating}</span>
											:
												<span className="rating-block-text">0</span>
											}
										</div>
										<Rate className="rating-block" style={{ fontSize:'20px' }} disabled value={grand_total_rating} />
										<span className="title">Overall Rating</span>
									</li>
								</ul>
							</div>
							<div className="content-bottom">
								<h3>Write a review</h3>
								<FormItem>
									{getFieldDecorator('review', {
										initialValue: freelancer_job_rating.review,
										rules: [{
										  required: true, message: 'Please enter job review'
										}, {max: 500, message: 'Please enter less text for job review'}]
									})(
									<TextArea placeholder="Please provide your valuable feedback on your experience with Freelancer." autosize={{ minRows: 6, maxRows: 6 }} />
									)}
								</FormItem>
							</div>
						</React.Fragment>
					: 
						<React.Fragment>
							<div className="content-middle">
								<h3>How much stars would you like to give to this client?</h3>
								<ul>
									<li>
										{this.state.value && <span className="ant-rate-text">{this.state.value}</span>}
										<Rate className="rating-block" style={{ fontSize:'20px' }} onChange={this.handleChange} value={this.state.value} />
										<span className="title">Overall Rating</span>
									</li>
								</ul>
							</div>
							<div className="content-bottom">
								<h3>Write a review</h3>
								<FormItem>
									{getFieldDecorator('review', {
										initialValue: client_job_rating.review,
										rules: [{
										  required: true, message: 'Please input job review'
										}, {max: 500, message: 'Please enter less text for job review'}]
									})(
									<TextArea placeholder="Please provide your valuable feedback on your experience with Client." autosize={{ minRows: 6, maxRows: 6 }} />
									)}
								</FormItem>
								<h2>Please provide us with your feedback on how can we improve your experience because we value your feedbacks</h2>
								<FormItem>
									{getFieldDecorator('feedback', {
										initialValue: client_job_rating.feedback,
										rules: [{max: 500, message: 'Please enter less text for job feedback'}]
									})(
									<TextArea placeholder="Please provide your valuable feedback on your experience with Client." autosize={{ minRows: 6, maxRows: 6 }} />
									)}
								</FormItem>
							</div>
						</React.Fragment> 
					}
				</div>

				<div className="button-holder">
				{Defender.currentUser()._r.includes("client") ?
					<Button className="close-job-btn" type="primary" size="large" htmlType="submit">Close My Job</Button>
				: 
					<Button className="close-job-btn" type="primary" size="large" htmlType="submit">Submit</Button>
				}
					<Button size="large">Cancel</Button>				
				</div>
			</Form>

			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
    view_job_reducer: state.job_view_reducer,
    freelancer_job_rating_reducer: state.freelancerjobRatingReducer,
    client_job_rating_reducer: state.clientjobRatingReducer,
    get_freelancer_ratings_reducer: state.get_freelancer_ratings_reducer,
    get_client_ratings_reducer: state.get_client_ratings_reducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    },

    addReviewRating: (job_id, data) => (dispatch(arrActions.add(job_id, data))),
    getFreelancerJobRating: (job_id, user_id) => (dispatch(gfrActions.fetch(job_id, user_id))),
    getClientJobRating: (job_id, user_id) => (dispatch(gcrActions.fetch(job_id, user_id))),
  }
}

const AddReviewRatingForm = Form.create()(AddReviewRating);
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewRatingForm);
