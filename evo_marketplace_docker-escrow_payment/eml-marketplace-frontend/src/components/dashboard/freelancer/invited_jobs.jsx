import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Rate, Tag, Icon, Modal, Button, Form, Input } from 'antd';
import Defender from './../../../helpers/defender';
import * as fActions from './../../../actions/dashboard/freelancer';
import * as fijActions from './../../../actions/freelancer_invited_jobs';
import moment from 'moment';

import apply_popup_image from '../../../images/apply-now.gif';


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
		iconLoading: false
	};

	setModalCoverLetter(modal_cover_letter) {
		this.setState({ modal_cover_letter });
	}

  	popup_dismissal = (e) => {
    	this.setModalCoverLetter(false);
  	}

	handleSubmitCoverLetter = (e) => {
	    e.preventDefault();

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
	          if (!this.props.freelancer_dashboard_reducer.success) {
	          }
	        });
	      } else {
	      	this.props.fetchInvitedJobs();
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

	render(){
		const { invited_jobs } = this.props.freelancer_invited_jobs_reducer;
		const { getFieldDecorator } = this.props.form;
		return(
			<React.Fragment>
				{ invited_jobs && invited_jobs.length > 0 ? 
					<div className="heading-block">
						<h2>Job Invitations</h2>
					</div>
				: <h2>No Job Invitations Yet</h2>
				 }
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
							{val.job_client_payment_status === false ?
								<li><Icon type="credit-card" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>Unverified</span></li>
							:
								<li><Icon type="credit-card" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>Verified</span></li>
							}
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
									<Button className="filled-btn" onClick={this.custom_click.bind(this,val)} >Apply</Button>
								}
							</div>
						<div className="body-detail">
							<p>{val.description}{/*<a href="">more</a>*/}</p>
						</div>
					</div>
				))}
		          <Modal
		            centered
		            className="apply-job-popup-holder"
		            width='720px'
		            visible={this.state.modal_cover_letter}
		            onOk={() => this.setModalCoverLetter(false)}
		            onCancel={() => this.setModalCoverLetter(false)}
		            footer={[
		            <Form key={5} className="freelancer-job-detail-form" onSubmit={this.handleSubmitCoverLetter}>
		              <div className="job-detail-form-row">
		                    <FormItem label="Proposed Budget">
		                    {getFieldDecorator('expected_amount',{
		                    })(
		                    <Input addonBefore="$" placeholder="Minimum posted budget should be more then $100" />
		                    )}
		                    </FormItem>
		              </div>
		              <div className="job-detail-form-row">
		                    <FormItem label="Estimated Completion Duration">
		                    {getFieldDecorator('expected_timeline',{
		                    })(
		                      <Input addonBefore="Week" />
		                    )}
		                    </FormItem>
		              </div>
		              <div className="job-detail-form-row">
		                    <FormItem label="Cover Letter">
		                    {getFieldDecorator('cover_letter',{
		                    })(
		                      <TextArea rows={4} />
		                    )}
		                    </FormItem>
		              </div>
		              <Button key="back" onClick={this.handleCancel}>Cancel</Button>
		              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleOk}>Apply</Button>
		            </Form>
		            ]}
		          >
		            <div className="popup-image-holder">
		              <img src={apply_popup_image} alt="Apply Popup img" />
		            </div>
		            <div className="popup-content-holder">
		              <h2>{this.state.selected_job_title}</h2>
		              <ul>
		                <li>Category: {this.state.selected_job_category}</li>
		                <li>Max. Budget : ${this.state.selected_job_minimum_budget}</li>
		              </ul>
		            </div>
		          </Modal>
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

   }
}


const InvitedJobsForm = Form.create()(InvitedJobs);
export default connect(mapStateToProps, mapDispatchToProps)(InvitedJobsForm);