import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, message, AutoComplete, Tooltip, Select, Radio, Upload, Tag, DatePicker } from 'antd';
import * as uActions from './../../actions/job_creation_wizard';
import * as cActions from './../../actions/job_categories';
import * as sActions from './../../actions/skills';
import * as vActions from './../../actions/job_categories/view';
import JobAdvisorForm from './job_advisor';
import SignUp from './sign_up';
import Defender from './../../helpers/defender';
import ReactSVG from 'react-svg';
import moment from 'moment';
import user_help from '../../images/advisor.png';
import svg from '../../images/hexagon-shape.svg';

const FormItem = Form.Item;
const Option = Select.Option;


class JobCreation extends Component{

	state = {		
		loading: false,
	    visible: false,
		startValue: moment(),
		endValue: null,
		endOpen: false,
		confirmDirty: false,
		iconLoading: false,
		filesList: [],
		skillsList: [],
		skillValue: '',
    	modalpopup: false,
    	modalpopupsuccess: false,
    	showJobAdvisorForm: false,
    	modal_sign_up: false,
    	showSignUpForm: false,
    	formList: [],
    	title: '',
    	description: '',
    	availability: 'a',
    	desired_profile: 'a',
    	duration: 'a',
    	minimum_budget: 0,
    	additional_info: ''
	};


	toggleJobAdvisorForm(e) {
	    e.preventDefault();
	    this.setState({
	      showJobAdvisorForm: !this.state.showJobAdvisorForm,
	      modalpopup: !this.state.modalpopup,
	    });
	}


	enterLoading = () => {
		this.setState({ loading: !this.state.loading });
	}
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
	}

	componentWillMount() {
		this.props.fetchAllSkills();
		this.props.fetchJobCategory();
		this.props.fetchViewJobCategory(this.props.id);
	}

	onSelect = (value) => {
		let { skillsList } = this.state;
		skillsList.push(value);
		this.setState({skillsList: skillsList});
	}

  onClose = (value) => {
    this.setState({skillsList: this.state.skillsList.filter((sl) => (
      value === sl
    ))});
  }
  descriptionChange = (text) => {
    this.setState({jobDescription: text});
  }

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

  onChange = (field, value) => {
	this.setState({
	  [field]: value,
	});
  }

  updateValue = (value) => {
	this.onChange('availability', value);
	this.setState({ availability: value });
  }

  updateDuration = (value) => {
	this.onChange('duration', value);
	this.setState({ duration: value });
  }

  updateDesiredProfile = (value) => {
	this.onChange('desired_profile', value);
	this.setState({ desired_profile: value });
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


	toggleSignUpForm(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        this.setState({
	  			showSignUpForm: !this.state.showSignUpForm,
	  			modal_sign_up: !this.state.modal_sign_up,
			});
	      } 
	    });
	}

  handleSubmit = (e) => {
  	if (!!Defender.currentUser()){
	    e.preventDefault();

	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        let { filesList } = this.state;
	        let { startValue } = this.state;
	        let { availability } = this.state;
	        let { duration } = this.state;
	        let { desired_profile } = this.state;
	        if (typeof startValue !== 'string'){
	        	startValue = values.starting_date;

	        } 
	        if (typeof desired_profile !== 'string'){
	        	desired_profile = values.desired_profile;
	        } 
	        if (typeof duration !== 'string' ){
	        	duration = values.duration;
	        } 
	        if (typeof availability !== 'string'){
	        	availability = values.availability;
	        } 
	        let  data = {}
	        data["title"] = values.title;
	        data["description"] = values.description;
	        data["minimum_budget"] = values.minimum_budget;
	        data["job_files_attributes"] = filesList;
	        data["skill_list"] = this.state.skillsList.join(", ");
	        data["job_category_id"] = window.location.href.split('/')[4];
	        data["starting_date"] = startValue;
	        data["availability"] = availability;
	        data["duration"] = duration;
	        data["desired_profile"] = desired_profile;
	        data["additional_info"] = values.additional_info;
	        this.props.save(data).then((res) => {
	          if (!this.props.jobCreationReducer.success) {
	          } else {
	            window.location = '/'
	          }
	        });
	      } else {
	        this.enterLoading();
	      }
	    });
	}
  }

  handleConfirmBlur = (e) => {}


	handleClose = (removedTag) => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		this.setState({ tags });
	}

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	}

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value });
	}

	handleInputConfirm = () => {
		const state = this.state;
		const inputValue = state.inputValue;
		let tags = state.tags;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
		});
	}

	handleChangeTitle = (e) => {
		if (e.target.value !== ""){
			this.setState({ title: e.target.value });
		}
	}

	handleChangeDescription = (e) => {
		if (e.target.value !== ""){
			this.setState({ description: e.target.value });
		}
	}

	handleChangeAdditionalInfo = (e) => {
		if (e.target.value !== ""){
			this.setState({ additional_info: e.target.value });
		}
	}

	handleChangeMinimumBudget = (e) => {
		if (e.target.value !== ""){
			this.setState({ minimum_budget: e.target.value });
		}
	}


	saveInputRef = input => this.input = input


	render(){
		document.body.classList.add('job_creation_page');
		const { job_category } = this.props.view_job_category_reducer;
		const RadioButton = Radio.Button;
		const RadioGroup = Radio.Group;
		const Dragger = Upload.Dragger;
		const { getFieldDecorator } = this.props.form;
		const { TextArea } = Input;
	    const _that = this;
	    const props = {
	      name: 'tmp_file',
	      multiple: true,
	      action: `${process.env.REACT_APP_API_URL}/tmp_fileuploader`,
	      onRemove(file) {
	        _that.setState({filesList: _that.state.filesList.filter((fl) => (
	          fl.avatar === file.response.file
	        ))
	        });
	      },
	      onChange(info) {
	        const status = info.file.status;
	        if (status !== 'uploading') {
	        }
	        if (status === 'done') {
	          let { filesList } = _that.state;
	          filesList.push({avatar: info.file.response.file});
	          _that.setState({filesList: filesList});
	          message.success(`${info.file.name} file uploaded successfully.`);
	        } else if (status === 'error') {
	          message.error(`${info.file.name} file upload failed.`);
	        }
	      },
	    };
	    const { skills } = this.props.skills_reducer;
		const Complete = () => {
	    const children = skills.map((result) => {
	        return <Option key={result.name}>{result.name}</Option>
	    });

		return (
			<AutoComplete
			    style={{ width: '100%', height:'40px' }}
	          	onSelect={this.onSelect}
			    placeholder="Search Skills"
			    >
	        	{children}
			</AutoComplete>
		);
		}

		return(
		<Form className="job-post-form" onSubmit={this.handleSubmit}>
			<div className="job-post-holder">
				<div className="job-post-heading">
					<h1>Job Requirements</h1>
					<a className="back-btn" href="/job_category">
						<span><Icon type="left" /></span>
						<strong>{job_category.name}</strong>
					</a>
				</div>
				<div className="job-post-body">
					<header className="job-header">
						<h2>Title of the job</h2>
						<div className="header-contents">
							<FormItem>
								  {getFieldDecorator('title',{
									rules: [{
									  required: true, message: 'Please input job title'
									}]
								  })(
									<input placeholder="I want to create a chatbot for my e-commerce store" autosize={{ minRows: 1, maxRows: 2 }} id="title" onChange={(e) => {this.handleChangeTitle(e)}} />
								  )}
							</FormItem>
						</div>
					</header>

					<section className="section1">
						<aside className="right-sidebar">
							<h2>&nbsp;</h2>
							<div className="right-sidebar-block">
								<div className="image-holder">
									<img src={user_help} alt="User Help img" />
								</div>
								<h2>Need help posting the job?</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua.</p>
								{ this.state.showJobAdvisorForm ? <JobAdvisorForm cancelFunc={this.toggleJobAdvisorForm.bind(this)} modalpopup={this.state.modalpopup}/> : ''}
								<Button type="primary" onClick={this.toggleJobAdvisorForm.bind(this)}>Hire an Advisor</Button>
							</div>
						</aside>
						<div className="left-content">
							<h3>Briefly describe the job requirements</h3>
							<div className="contents">
							<FormItem>
								{getFieldDecorator('description',{
									rules: [{
									  required: true, message: 'Please input job description'
									}]
								  })(
								<TextArea placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam" autosize={{ minRows: 8, maxRows: 8 }} id="description" onChange={(e) => {this.handleChangeDescription(e)}}  />
								)}
								<div className="image-uploader">
									<Dragger {...props}>
										<span className="upload-drag-icon">
											<Icon type="upload" />
										</span>
										<div className="upload-contents">
											<p className="ant-upload-text">Click or drag file to this area to upload</p>
											<p className="ant-upload-hint">Upload project files or the files which can help explain your project</p>
										</div>
									</Dragger>
								</div>
							</FormItem>
							</div>
						</div>
					</section>

					<section className="section2">
						<h2><span>Required Skills</span><Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></h2>
						<div className="section-holder">
							<div className="two-columns">
								<div className="content-block tag-holder">
									<div className="search-fields-holder">
										<Complete />
									</div>
									<div className="default-tags-list">
										{ this.state.skillsList.map((val) => (
											<Tag closable color="#1890ff" style={{ fontSize:'14px', fontWeight:'400', height:'auto', padding:'3px 10px 4px' }} key={val}>
												{val}
											</Tag>
										)) }
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section3">
						<div className="section-holder">
							<div className="two-columns">
								<div className="columns">
									<h2>Job Parameters</h2>
									<div className="columns-holder">
										<div className="columns-holder-row">
											<h3>Starting Date</h3>
	 										{getFieldDecorator('starting_date',{
								  				initialValue: moment()
								  			})(
												<DatePicker
													size="large"
													style={{width:'100%', fontSize:'14px'}}
													disabledDate={this.disabledStartDate}
													placeholder="Start"
													onChange={this.onStartChange}
													onOpenChange={this.handleStartOpenChange}
												/>
											)}
										</div>
										<div className="columns-holder-row">
											<h3>Availability required - Number of days/week</h3>
	 										{getFieldDecorator('availability',{
	 											initialValue: "a",
								  			})(
												<Select
													size="large"
													style={{width:'100%', fontSize:'14px'}}
													showSearch
													placeholder="Choose availability"
													optionFilterProp="children"
	   												onChange={this.updateValue}
													>
													<Option value="a">2 Days a week</Option>
													<Option value="b">4 Days a week</Option>
													<Option value="c">5 Days a week</Option>
													<Option value="d">Part Time</Option>
													<Option value="e">Full Time</Option>
												</Select>
											)}
										</div>
										<div className="columns-holder-row">
											<h3>Duration</h3>
											  {getFieldDecorator('duration',{
											  		initialValue: "a",
										  		})(
												<RadioGroup onChange={this.updateDuration}>
													<RadioButton size="large" value="a" >1-3 Months</RadioButton>
													<RadioButton size="large" value="b">3-6 Months</RadioButton>
													<RadioButton size="large" value="c">More then 6 Months</RadioButton>
													<RadioButton size="large" value="d">Not Sure</RadioButton>
												</RadioGroup>
												)}
										</div>
									</div>
								</div>
								<div className="columns">
									<h2>Desired Profile</h2>
									<div className="columns-holder columns2">
									  {getFieldDecorator('desired_profile',{
									  		initialValue: "a",
								  		})(
											<RadioGroup className="designation-radio-holder" size="large" onChange={this.updateDesiredProfile}>
												<RadioButton className="designation-radio-list" value="a"><span className="designation-radio-text">Junior</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
												<RadioButton className="designation-radio-list" value="b"><span className="designation-radio-text">Senior</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
												<RadioButton className="designation-radio-list" value="c"><span className="designation-radio-text">Expert</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
											</RadioGroup>
										)}
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
										<h3>Max. Budget</h3>
										<FormItem>
						  					{getFieldDecorator('minimum_budget',{
												rules: [{
								  					required: true, message: 'Please enter amount in $'
												}]
						  				})(
											<Input size="large" addonBefore="$" onChange={(e) => {this.handleChangeMinimumBudget(e)}} id="minimum_budget"  />
						  				)}
										</FormItem>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section4">
						<h2>Any Additional Information (Optional)</h2>
						<div className="optionals-information">
							<FormItem>
								  {getFieldDecorator('additional_info',{
								  })(
									<TextArea placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." autosize={{ minRows: 2, maxRows: 6 }} onChange={(e) => {this.handleChangeAdditionalInfo(e)}}  />
								  )}
							</FormItem>
							
						</div>
						{!!Defender.currentUser() ?
							<Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>Submit</Button>
						: 
						<React.Fragment>
							{ this.state.showSignUpForm ? <SignUp cancelFunc={this.toggleSignUpForm.bind(this)} modal_sign_up={this.state.modal_sign_up} skill_list = {this.state.skillsList.join(", ")} filesList = {this.state.filesList} title = {this.state.title} description = {this.state.description} additional_info = {this.state.additional_info} minimum_budget = {this.state.minimum_budget} availability = {this.state.availability} desired_profile = {this.state.desired_profile} duration = {this.state.duration} startValue = {this.state.startValue}  /> : ''}
							<Button type="primary" onClick={this.toggleSignUpForm.bind(this)}>Submit</Button>
						</React.Fragment>
						}
					</section>
				</div>
			</div>
		</Form>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
	jobCreationReducer: state.job_creation_wizard,
	skills_reducer: state.skills_reducer,
	job_categories_reducer: state.job_categories_reducer,
	view_job_category_reducer: state.job_category_view_reducer,
	id: ownProps.match.params.job_category
  }
}
function mapDispatchToProps(dispatch) {
  return {
	fetchAllSkills: () => (dispatch(sActions.fetch())),
	save: (data) => (dispatch(uActions.submitForm({job: data}))),

    fetchJobCategory: () => {
      return dispatch(cActions.fetchJobCategory())
    },
    fetchViewJobCategory: (id) => {
      return dispatch(vActions.fetchViewJobCategory(id))
    }
  }
}

const wrappedJobCreationWizardForm = Form.create()(JobCreation);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobCreationWizardForm);
