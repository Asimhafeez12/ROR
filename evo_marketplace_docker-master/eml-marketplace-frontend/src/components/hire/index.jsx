import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Tooltip, Radio, DatePicker, Checkbox, message } from 'antd';
import * as vActions from './../../actions/jobs/view';
import * as userActions from './../../actions/users/';
import * as hActions from './../../actions/update_job';
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
    	startValue: moment(),
    	endValue: null,
    	confirmLoading: false,
    	milestone_description: '',
    	milestone_price: '',
    	milestone_closing_date: moment().endOf('day').add(2, 'days'),
	    showEditProjectMilestoneForm: false,
	    edit_modal_milestones: false,
	};

	disabledStartDate = (startValue) => {
	const endValue = this.state.endValue;
	if (!startValue || !endValue) {
	  return false;
	}
	return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate = (endValue) => {
	const startValue = this.state.startValue;
	if (!endValue || !startValue) {
	  return false;
	}
	return endValue.valueOf() <= startValue.valueOf();
	}

	onStartChange = (value) => {
	this.onChange('startValue', value);
	this.setState({ startValue: value });
	}

	onEndChange = (value) => {
	this.onChange('endValue', value);
	}

	handleStartOpenChange = (open) => {
	if (!open) {
	  this.setState({ endOpen: true });
	}
	}

	handleEndOpenChange = (open) => {
	this.setState({ endOpen: open });
	}


	onChange = (e) => {
		if (e.target){
			this.setState({
				value: e.target.value,
			});
			if (e.target.value === "1"){
				e.preventDefault();
				var element = document.getElementById("milestone_submit");
				var block = document.querySelector(".milestone-main-holder");
				element.classList.add("show");
				block.classList.remove("show");
				block.classList.add("hide");
				this.props.form.resetFields();
				this.setState({ milestone_description: '' });
				this.setState({ milestone_price: '' });
				this.setState({ milestone_closing_date: null });
			}

		}
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

	toggleEditForm(e) {
	e.preventDefault();
	this.setState({
	  showEditProjectMilestoneForm: !this.state.showEditProjectMilestoneForm,
	  edit_modal_milestones: !this.state.edit_modal_milestones,
	});
	}


	handleChangeDescription = (e) => {
		if (e.target.value !== ""){
			this.setState({ milestone_description: e.target.value });
		}
	}

	handleChangePrice = (e) => {
		if (e.target.value !== ""){
			this.setState({ milestone_price: e.target.value });
		}
	}

	onStartChange = (value) => {
		this.setState({ milestone_closing_date: value });
	}

	disabledDate(current) {
	// Can not select days before today and today
	return current && current < moment().endOf('day').add(2, 'days');
	}


	handleSubmitMilestone = (e) => {
	this.props.form.validateFieldsAndScroll((err, values) => {
	  if (!err) {
		var element = document.getElementById("milestone_submit");
		var block = document.querySelector(".milestone-main-holder");
		element.classList.add("hide");
		block.classList.remove("hide");
		block.classList.add("show");
	    this.setState({confirmLoading: false});
	  }
	});
	}

	removeSubmitMilestone = (e) => {
		e.preventDefault();
		var element = document.getElementById("milestone_submit");
		var block = document.querySelector(".milestone-main-holder");
		element.classList.add("show");
		block.classList.remove("show");
		block.classList.add("hide");
		this.props.form.resetFields();
		this.setState({ milestone_description: '' });
		this.setState({ milestone_price: '' });
		this.setState({ milestone_closing_date: null });
	}


	toggleEscrowForm(e) {
	    e.preventDefault();
	    var element = document.getElementById("terms_and_conditions");
	    	if (element.value === "true"){
			    this.props.form.validateFieldsAndScroll((err, values) => {
			      if (!err) {
			      	let { startValue } = this.state;
			        let  data = {}
			        data["description"] = values.description;
			        data["minimum_budget"] = values.minimum_budget;
			        data["milestone_user_id"] = window.location.href.split('/')[6];
			        if (typeof startValue !== 'string'){
			        	startValue = values.deadline;

			        } 
			        data["deadline"] = startValue;
			        // if (values.terms_and_conditions === true){
			        // 	data["terms_and_conditions"] = values.terms_and_conditions;
			        // }
					this.props.save(window.location.href.split('/')[4], data);

				    this.setState({
				      showEscrowForm: !this.state.showEscrowForm,
				      modal_escrow_form: !this.state.modal_escrow_form,
				    });
			      }
			    });
			}
			else{
				message.error("Please agree to Wurker.AI Terms of Service including the User Agreement and Privacy Policy")
			}
	}

	check_minimum_budget = (rule, value, callback) => {

		//const form = this.props.form;
		if (value && value.toString().indexOf("-") > -1) {
			callback('Please enter amount greater than 100');
		}
		if (value && value.toString().indexOf(".") > -1) {
			callback('Please enter amount greater than 100');
		}
		if (value.toString().length < 3) {
			callback('Please enter amount greater than 100');
		} 
		else {
			callback();
		}
	}

	togglePaymentForm(e) {
	      e.preventDefault();
		    this.props.form.validateFieldsAndScroll((err, values) => {
		      if (!err) {
		      	let { startValue } = this.state;
		        let  data = {}
		        data["description"] = values.description;
		        data["minimum_budget"] = values.minimum_budget;
		        data["milestone_user_id"] = window.location.href.split('/')[6];
		        if (typeof startValue !== 'string'){
		        	startValue = values.deadline;

		        }
		        data["deadline"] = startValue;
		        // if (values.terms_and_conditions === true){
		        // 	data["terms_and_conditions"] = values.terms_and_conditions;
		        // }
				this.props.save(window.location.href.split('/')[4], data);

			    this.setModalEscrow(false);
			    this.setState({
			        showPaymentForm: !this.state.showPaymentForm,
			        modal_payment_form: !this.state.modal_payment_form,
			    });
		      }
		    });
	}

	// check_terms_and_conditions = (rule, value, callback) => {
	// 	const form = this.props.form;
	// 	if (value === undefined) {
	// 		callback('Please agree to Wurker.AI Terms of Service including the User Agreement and Privacy Policy');
	// 	}
	// 	if (value === false) {
	// 		callback('Please agree to Wurker.AI Terms of Service including the User Agreement and Privacy Policy');
	// 	} 
	// 	else {
	// 		callback();
	// 	}
	// }


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
			                        <React.Fragment>
			                        	<img src={user.client_avatar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
			                        </React.Fragment>
			                        : 
			                        <img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
								<img src={hireImage2} alt="Hire Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div className="content">
								<h3>How it all works?</h3>
								<p>Wurker.ai uses Escrow.com as our escrow payment service platform.<br/> For the very first transaction, client will have to create an account on escrow.com.<br/>
								Client can either deposit whole amount of project in escrow or break the project down into milestones and deposit a less amount for that milestone.
								<br/>Once the client is satisfied with the first milestone delivery, they can approve the milestone and the payment will be released from client’s escrow account to the freelancer’s escrow account.</p>
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
										},{ validator: this.check_minimum_budget }]
									  })(
										<Input type="number" size="large" addonBefore="$" onChange={(e) => {this.handleChange(e)}} />
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
										      <React.Fragment>
										          { job.user_id === Defender.currentUser().id && job.milestones_count < 1  ?
										          <Form className="milestones-form" id="milestone_form">
										            <h2>Create Milestones :</h2>
										            <div className="milestone-row">
										                <FormItem label="Milestones Descriptions">
										                  {getFieldDecorator('milestone_description', {
										                    initialValue: this.state.description_value,
										                    rules: [{
										                      required: true, message: 'Please enter description'
										                    }, {max: 400, message: 'Please enter less text for description'}]
										                  })(<TextArea autosize={{ minRows: 3, maxRows: 3 }} id="description" onKeyUp={(e) => {this.handleChangeDescription(e)}} />)}
										                </FormItem>
										            </div>
										            <div className="milestone-row">
										                <div className="milestone-column">
										                    <FormItem label="Deposit Amount">
										                      {getFieldDecorator('milestone_price', {
										                        initialValue: this.state.price_value,
										                        rules: [{
										                            required: true, message: 'Please enter desposit amount'
										                          }]
										                      })(<Input addonBefore="$" max={job.minimum_budget} id="price" onKeyUp={(e) => {this.handleChangePrice(e)}} />)}
										                    </FormItem>
										                </div>
										                <div className="milestone-column">
										                  <FormItem label="Expected Date">
										                    {getFieldDecorator('milestone_closing_date',{
										                    	initialValue: moment().endOf('day').add(2, 'days')
										                    }
										                     )(<DatePicker disabledDate={this.disabledDate} onChange={this.onStartChange}/>)}
										                  </FormItem>
										                </div>
										            </div>
										            <div className="milestone-row button-holder">
										                <Form.Item>
														  <Button onClick={this.handleSubmitMilestone} type="primary" id="milestone_submit">Add</Button>
										                </Form.Item>
										            </div>
										          </Form>
										          : "" }
										      </React.Fragment>
												<div className='milestone-main-holder hide'>
													<div className='milestone-block'>
														<h2>Title: Milestone {1}</h2>
														<p>{this.state.milestone_description}</p>
														<span className="milestone-price">${this.state.milestone_price}</span>
														{this.state.milestone_closing_date ?
															<span className="milestone-due-date">Closing Date: &nbsp; {moment(this.state.milestone_closing_date).format('MM/DD/YYYY')}</span>
														: "" }
														<a className="remove-milestone-btn" onClick={this.removeSubmitMilestone} ><Icon type="delete" /></a>
			                							{/*{ this.state.showEditProjectMilestoneForm ? <EditProjectMilestoneForm cancelFunc={this.toggleEditForm.bind(this)} edit_modal_milestones={this.state.edit_modal_milestones} milestone_price={this.state.milestone_price} milestone_description={this.state.milestone_description} milestone_closing_date={this.state.milestone_closing_date} job_id={job.id} /> : ''}
                										<a className="edit-milestone-btn" type="primary" onClick={this.toggleEditForm.bind(this)}><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" /></a>	*/}
													</div>
												</div>
											</React.Fragment>
											: null
										}
									</Radio>
								</RadioGroup>
							</div>
							{job.deadline ?
								<div className="section1-row">
									<h3>Project Due Date :</h3>
		 							{getFieldDecorator('deadline',{
						  				initialValue: moment(job.deadline)
						  			})(
										<DatePicker
											size="large"
											style={{width:'100%', fontSize:'14px'}}
											disabledDate={this.disabledDate}
											placeholder="Start"
											onChange={this.onStartChange}
											onOpenChange={this.handleStartOpenChange}
										/>
									)}
								</div>
							:
								<div className="section1-row">
									<h3>Project Due Date :</h3>
		 							{getFieldDecorator('deadline',{
						  				initialValue: moment()
						  			})(
										<DatePicker
											size="large"
											style={{width:'100%', fontSize:'14px'}}
											disabledDate={this.disabledDate}
											placeholder="Start"
											onChange={this.onStartChange}
											onOpenChange={this.handleStartOpenChange}
										/>
									)}
								</div>
							}
						</div>
					</section>

					<section className="section2">
						<h2>Job Description :</h2>
						<FormItem>
							  {getFieldDecorator('description',{
							  	initialValue: job.description
							  })(
								<TextArea placeholder="" autosize={{ minRows: 6, maxRows: 6 }} />
							  )}
						</FormItem>
					</section>

					<section className="section3">
						<div className="agreement-text">
							<FormItem>
								{getFieldDecorator('terms_and_conditions',{
								})(
								<Checkbox>I agreed to Wurker.AI <a href="/fee_and_service_agreement" target="_blank" className="span-style">Terms of Service</a> including the <a href="/user_agreement" target="_blank" className="span-style">User Agreement</a> and <a href="/privacy_policy" target="_blank" className="span-style">Privacy Policy</a></Checkbox>
								)}
							</FormItem>
						</div>
						<div className="button-holder">
							{Defender.currentUser().escrow_knowledge === true ?
								<React.Fragment>
									{ this.state.showEscrowForm ? <EscrowForm cancelFunc={this.toggleEscrowForm.bind(this)} modal_escrow_form={this.state.modal_escrow_form} modal_payment_form={this.state.modal_payment_form} job={job} user={user} milestone_description={this.state.milestone_description} milestone_price={this.state.milestone_price} milestone_closing_date={this.state.milestone_closing_date} job_type={this.state.value} /> : ''}
									<Button type="primary" onClick={this.toggleEscrowForm.bind(this)}>Hire&nbsp;{user.full_name}</Button>
								</React.Fragment>
							:
								<React.Fragment>
									{ this.state.showEscrowForm ? <EscrowForm cancelFunc={this.toggleEscrowForm.bind(this)} modal_escrow_form={this.state.modal_escrow_form} modal_payment_form={this.state.modal_payment_form} job={job} user={user} milestone_description={this.state.milestone_description} milestone_price={this.state.milestone_price} milestone_closing_date={this.state.milestone_closing_date} job_type={this.state.value} /> : ''}
									<Button type="primary" onClick={this.toggleEscrowForm.bind(this)}>Hire&nbsp;{user.full_name}</Button>
								</React.Fragment>
							}
							<Button className="hire-cancel-btn" size="large" href="/client">Cancel</Button>					
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

