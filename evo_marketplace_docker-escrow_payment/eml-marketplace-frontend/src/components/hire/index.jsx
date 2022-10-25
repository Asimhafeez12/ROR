import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Tooltip, Radio, DatePicker, Checkbox } from 'antd';
import * as vActions from './../../actions/jobs/view';
import * as userActions from './../../actions/users/';
import * as hActions from './../../actions/update_job';
import JobMilestones from './job_milestones';
import JobMilestoneForm from './job_milestone_form';
import PaymentForm from './payment_form';
import EscrowForm from './escrow_form';
import Defender from './../../helpers/defender';
import moment from 'moment';
import FreelancerImage from '../../images/freelancer_default.png';
import hireImage2 from '../../images/hire_work.png';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class hireFreelancer extends Component{
	state = {
		loading: false,
		iconLoading: false,
		value: 1,
	    modal_escrow_form: false,
	    showEscrowForm: false,
    	modal_payment_form: this.props.modal_payment_form,
    	showPaymentForm: false,
	};
	onChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	}
	handleCancel = (e) => {
		this.setPopupShow(false)
		this.setBillingPopupShow(false)
	}

	popupShow = () => {
		this.setState({
			visible: true,
		});
	}

	setModalPayment(modal_payment_form) {
	  this.setState({ modal_payment_form });
	}


	setModalEscrow(modal_escrow_form) {
	  this.setState({ modal_escrow_form });
	}

	setshowEscrowForm(showEscrowForm) {
		this.setState({ showEscrowForm });
	}

	billingPopupShow = () => {
		this.setState({
			visible: true,
		});
	}
	setBillingPopupShow(billingPopupShow) {
		this.setState({ billingPopupShow });
	}
	componentWillMount() {
	  this.props.fetchViewJob(window.location.href.split('/')[4]);
	  this.props.fetchViewUser(window.location.href.split('/')[6]);
	}
	canViewJob = () => {
	  return false;
	}

	handleChange = (e) => {
		if (e.target.value !== ""){
			const { job } = this.props.view_job_reducer;
			let  data = {}
			data["minimum_budget"] = e.target.value;
			this.props.save(job.id, data);
			this.props.fetchViewJob(job.id);
		}
	}

	toggleEscrowForm(e) {
	    e.preventDefault();

	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        let  data = {}
	        data["description"] = values.description;
	        data["minimum_budget"] = values.minimum_budget;
	        data["deadline"] = values.deadline;
	        if (values.terms_and_conditions === true){
	        	data["terms_and_conditions"] = values.terms_and_conditions;
	        }
			this.props.save(window.location.href.split('/')[4], data);

		    this.setState({
		      showEscrowForm: !this.state.showEscrowForm,
		      modal_escrow_form: !this.state.modal_escrow_form,
		    });
	      }
	    });
	}

	togglePaymentForm(e) {
	      e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        let  data = {}
	        data["description"] = values.description;
	        data["minimum_budget"] = values.minimum_budget;
	        data["deadline"] = values.deadline;
	        if (values.terms_and_conditions === true){
	        	data["terms_and_conditions"] = values.terms_and_conditions;
	        }
			this.props.save(window.location.href.split('/')[4], data);

		    this.setModalEscrow(false);
		    this.setState({
		        showPaymentForm: !this.state.showPaymentForm,
		        modal_payment_form: !this.state.modal_payment_form,
		    });
	      }
	    });
	}

	render(){
		const { job } = this.props.view_job_reducer;
		const { user } = this.props.user_view_reducer;
		document.body.classList.add('hire-freelancer-page');
		const { TextArea } = Input;
		const { getFieldDecorator } = this.props.form;

		return(
			<React.Fragment>
				{user && job ?
				<div className="hire-freelancer-holder">
					<header className="hire-header">
						<div className="hire-header-left">
							<h1>{job.title}</h1>
							<dl>
								<dt>Posted on:</dt>
								<dd>{moment(job.created_at).format('MM/DD/YYYY')}</dd>
							</dl>
						</div>
						<div className="hire-header-right">
							<a href={'/profile/'+ user.id} >
								<div className="hire-image-holder">
			                      {!!user.client_avatar ?
			                        "" : <img src={FreelancerImage} alt="User img" />
			                      }
								</div>
								<div className="content">
									<h2>Hiring</h2>
									<span className="freelancer-name">{user.full_name}</span>
								</div>
							</a>
						</div>
					</header>

					<section className="section1">
						<div className="section1-right">
							<div className="image-holder">
								<img src={hireImage2} alt="Hire Freelancer img" />
							</div>
							<div className="content">
								<h3>How it all works?</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
						</div>
						<div className="section1-left">
							<div className="section1-row">
								<h3>Total Budget :</h3>
								<FormItem>
									  {getFieldDecorator('minimum_budget',{
									  	initialValue: job.minimum_budget,
										rules: [{
										  required: true, message: 'Please enter total budget'
										}]
									  })(
										<Input size="large" addonBefore="$" onChange={(e) => {this.handleChange(e)}} />
									  )}
								</FormItem>
							</div>
							<div className="section1-row no-margin">
								<h3><span>Deposit into Escrow : </span> <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'16px', fontWeight:'400'}} /></Tooltip></h3>
								<RadioGroup onChange={this.onChange} value={this.state.value}>
									<Radio className="radio-row" value={1}>Deposit ${job.minimum_budget} to escrow for the whole project.</Radio>
									<Radio className="radio-row" value={2}>Deposit a lesser amount for first milestone.
										{
											this.state.value === 2 ? 
											<React.Fragment>
												<JobMilestoneForm job={job} />
												<JobMilestones job={job} />
											</React.Fragment>
											: null
										}
									</Radio>
								</RadioGroup>
							</div>
							<div className="section1-row">
								<h3>Project Due Date :</h3>
				                {getFieldDecorator('deadline',{
				                  initialValue: moment(job.deadline)
				                })(
				              <FormItem>
				                <DatePicker
				                  style={{width:'100%', fontSize:'14px'}}
				                  disabledDate={this.disabledStartDate}
				                  placeholder="Choose Date"
				                  onChange={this.onStartChange}
				                  onOpenChange={this.handleStartOpenChange}
				                />
				              </FormItem>
				              )}
							</div>
						</div>
					</section>

					<section className="section2">
						<h2>Job Description :</h2>
						<FormItem>
						  {getFieldDecorator('description',{
						  	initialValue: job.description
						  })(
							<TextArea placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." autosize={{ minRows: 6, maxRows: 6 }} />
						  )}
						</FormItem>
					</section>

					<section className="section3">
						<div className="agreement-text">
						  {getFieldDecorator('terms_and_conditions',{
						  })(
							<Checkbox>I agreed to Evolve <span className="span-style">Terms of Service</span> including the <span className="span-style">User Agreement</span> and <span className="span-style">Privacy Policy</span></Checkbox>
						  )}
						</div>
						<div className="button-holder">
							{Defender.currentUser().escrow_knowledge === true ?
								<React.Fragment>
									{ this.state.showPaymentForm ? <PaymentForm cancelFunc={this.togglePaymentForm.bind(this)} modal_payment_form={this.state.modal_payment_form} job={job} user={user}/> : ''}
									<Button type="primary" onClick={this.togglePaymentForm.bind(this)}>Hire&nbsp;{user.full_name}</Button>
								</React.Fragment>
							:
								<React.Fragment>
									{ this.state.showEscrowForm ? <EscrowForm cancelFunc={this.toggleEscrowForm.bind(this)} modal_escrow_form={this.state.modal_escrow_form} modal_payment_form={this.state.modal_payment_form} job={job} user={user}/> : ''}
									<Button type="primary" onClick={this.toggleEscrowForm.bind(this)}>Hire&nbsp;{user.full_name}</Button>
								</React.Fragment>
							}
							<Button className="hire-cancel-btn" size="large" href="/">Cancel</Button>					
						</div>
					</section>

					<div className="popup-holder">				
					</div>
				</div>
			: "" }
			</React.Fragment>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
  	jobUpdateReducer: state.update_job_reducer,
    view_job_reducer: state.job_view_reducer,
    user_view_reducer: state.user_view_reducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    },
    fetchViewUser: (id) => {
      return dispatch(userActions.fetchViewUser(id))
    },
    save: (job_id, data) => (dispatch(hActions.submitForm(job_id, {job: data}))),
  }
}

const hireFreelancerForm = Form.create()(hireFreelancer);
export default connect(mapStateToProps, mapDispatchToProps)(hireFreelancerForm);

