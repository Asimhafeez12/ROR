import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button, Icon, Radio, Upload, Input, Select, message, Tooltip, AutoComplete, Tag, DatePicker } from 'antd';

import * as hActions from './../../actions/update_job';
import * as sActions from './../../actions/skills';
import * as vActions from './../../actions/jobs/view';
import Defender from './../../helpers/defender';
import * as hcActions from './../../actions/home_categories';

import ReactSVG from 'react-svg'
import moment from 'moment';

import svg from '../../images/hexagon-shape.svg';

const FormItem = Form.Item;
const Option = Select.Option;


class EditJob extends Component{

	  state = {
		startValue: null,
		endValue: null,
		endOpen: false,
	    confirmDirty: false,
		loading: false,
		iconLoading: false,
	    filesList: [],
	    skillsList: [],
	    skillValue: '',
	    jobDescription: '',
	    availability: null,
	    duration: null,
	    desired_profile: null,
	    category: "Not Sure",
	    dataSource: [],
	    searchTxt: '',
	    desired_profile_description: 'The Junior Developers charge $40-$70 per hour. They usually have experience of about 6-12 months in a relative domain.'
	  };

	enterLoading = () => {
		this.setState({ loading: !this.state.loading });
	}
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
	}
	  componentWillMount() {
	    this.props.fetchAllSkills();
	    this.props.fetchHomeCategory();
	    this.props.fetchViewJob(this.props.id);
	  }

	  canViewJob = () => {
	    return false;
	  }

	onSelect = (value) => {
	const { job } = this.props.view_job_reducer
	let { skillsList } = this.state;
	for (var i = 0; i < job.skill_list.length; i++) {
	    skillsList.push(job.skill_list[i]);
	}
	skillsList = skillsList.filter(function(item, pos) {
	    return skillsList.indexOf(item) === pos;
	})
	if (skillsList.indexOf(value) === -1){
		var sorted = [];
		const filteredValue = value.replace('Add New ', '');
		for (i = 0; i < skillsList.length; i++) {
		    sorted.push(skillsList[i].toLowerCase());
		}
		sorted.sort();
		if(sorted.indexOf(filteredValue) === -1){
		  if (!skillsList.includes(filteredValue)) {
		    skillsList.push(filteredValue);
		    this.setState({
		      skillsList: skillsList,
		      dataSource: []
		    });
		  }
		}
		else{
		  message.error("Skill already added");
		}
		setTimeout(
		  function() {
		    this.setState({
		      searchTxt: '',
		      dataSource: []
		    })
		  }.bind(this),
		  100
		)
	}
	else{
		message.error("Skill already added");
	}
	}

	fillDataSource = (value) => {
	const { job } = this.props.view_job_reducer;
	const { skills } = this.props.skills_reducer;
	const result = this.state.skillsList.concat(job.skill_list).filter(function(value, index, self) { //array unique
	    return self.indexOf(value) === index; 
	});

	let dataSource = skills;
	if (value)
	  dataSource = dataSource.filter(({id, name}) => name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
	return dataSource.map(({name}) => name).filter((name) => !result.includes(name));
	}
	onSearch = (value) => {
	let tags = this.fillDataSource(value);
	if (!tags.length) {
	  tags.push(`Add New ${value}`)
	}
	return this.setState({
	  dataSource: tags,
	  searchTxt: value
	});
	}

	changeTxt = (value) => {
	this.setState({
	  searchTxt: value
	})
	}

	onClose = (value) => {
	    this.setState({skillsList: this.state.skillsList.filter((sl) => (
	      value !== sl
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
	  }


	  updateDuration = (value) => {
		this.onChange('duration', value);
	  }

	  updateDesiredProfile = (value) => {
		this.onChange('desired_profile', value);
	  }

	updateCategory = (value) => {
		this.onChange('category', value.target.value);
		this.setState({ category: value.target.value });
	}

	  onStartChange = (value) => {
		this.onChange('startValue', value);
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

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { filesList } = this.state;
        let { startValue } = this.state;
        let { availability } = this.state;
        let { duration } = this.state;
        let { desired_profile } = this.state;
        let { category } = this.state;
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
        data["starting_date"] = startValue;
        data["availability"] = availability;
        data["duration"] = duration;
        data["category"] = values.category;
        data["desired_profile"] = desired_profile;
        data["additional_info"] = values.additional_info;
        this.props.save(this.props.id, data).then((res) => {
          if (!this.props.jobUpdateReducer.success) {
          } else {
            window.location = '/client';
          }
        });
      } else {
        this.enterLoading();
      }
    });
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

  handleConfirmBlur = (e) => {}

	render(){
		const { job } = this.props.view_job_reducer;
		if (job.user_id !== undefined && job.user_id !== Defender.currentUser().id){
			window.location = "/client";
		}
		document.body.classList.add('job_creation_page');
		const { home_categories } = this.props.home_categories_reducer;
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
	      beforeUpload(info){
	      	const extension = info.name.split('.').pop();
	      	if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'pdf' || extension === 'zip' || extension === 'txt'){
	      		return true;
	      	}
	      	else{
	      		message.error('File type not allowed');
	      		return false;
	      	}
	      },
	      onChange(info) {

	        const status = info.file.status;
	        if (status === undefined){
	        	info.fileList.splice(-1,1);
	        }
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
	    //const { skills } = this.props.skills_reducer;
		const { dataSource, searchTxt } = this.state;
    	const children = ((value) => (<Option key={value} text={value}>{value}</Option>));

		return(
			<Form className="job-post-form" onSubmit={this.handleSubmit}>
			<div className="job-post-holder">
				<div className="job-post-heading">
					<h1>Job Requirements</h1>
				</div>
				<div className="job-post-body">
					<section className="section1">
{/*						<aside className="right-sidebar">
							<div className="right-sidebar-block">
								<div className="image-holder">
									<img src={job.job_category_avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<p>{job.job_category}</p>
								<a className="hire-advisor-btn" href={'/edit_job_category/' + job.id}>Change</a>
							</div>
						</aside>*/}
						<div className="left-content">
							<h3>Title of the job</h3>
							<div className="contents add">
							<FormItem>
							  {getFieldDecorator('title',{
							  	initialValue: job.title,
								rules: [{
								  required: true, message: 'Please input job title'
								}, {max: 100, message: 'Please enter less text for title'}]
							  })(
								<TextArea placeholder="I want to create a chatbot for my e-commerce store" autosize={{ minRows: 1, maxRows: 2 }} />
							  )}
							</FormItem>
							</div>
							<h3>Briefly describe the job requirements</h3>
							<div className="contents">
								<FormItem>
									{getFieldDecorator('description',{
										initialValue: job.description,
										rules: [{
										  required: true, message: 'Please input job description'
										}, {max: 3000, message: 'Please enter less text for description'}]
									  })(
									<TextArea placeholder="" autosize={{ minRows: 8, maxRows: 8 }} />
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
								</FormItem>
							</div>
							<div className="columns-holder-row">
								<h3>Category</h3>
									<div className="job-category-listing-holder custom-add">
									  {getFieldDecorator('category',{
									  		initialValue: job.job_category,
								  		})(
										<RadioGroup onChange={this.updateCategory}>
											{home_categories.map( (category, index) =>
												<RadioButton key={index} size="large" value={category.title} >{category.title}</RadioButton>
											)}
											<RadioButton size="large" value="Not Sure" >Not Sure</RadioButton>
										</RadioGroup>
										)}
								</div> 
							</div> 
						</div>
					</section>

					<section className="section2">
						<h2><span>Required Skills</span><Tooltip className="help-link" title="Select the desired AI skills needed for the project"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></h2>
						<div className="section-holder">
							<div className="two-columns">
								<div className="content-block tag-holder">
									<div className="search-fields-holder">
				                      <AutoComplete
				                          style={{ width: '100%', height:'40px' }}
				                          onSelect={this.onSelect}
				                          placeholder="Search Skills"
				                          dataSource={dataSource.map(children)}
				                          onSearch={this.onSearch}
				                          value={searchTxt}
				                          onChange={this.changeTxt}
				                          >
				                      </AutoComplete>
								</div>
					            { this.state.skillsList.map((val) => (
									<Tag onClose={() => this.onClose(val)} closable color="#1890ff" style={{ fontSize:'14px', fontWeight:'400', height:'auto', padding:'3px 10px 4px' }} key={val}>
										{val}
									</Tag>
					              )) }
					            	{Object.keys(job).length > 0 ?
										<div className="default-tags-list">
							            { job.skill_list.map((val) => (
											<Tag onClose={() => this.onClose(val)} closable color="#1890ff" style={{ fontSize:'14px', fontWeight:'400', height:'auto', padding:'3px 10px 4px' }} key={val}>
												{val}
											</Tag>
							              )) }
										</div>
									: ""
									}
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
								  				initialValue: moment(job.starting_date)
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
								  				initialValue: job.availability
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
												</Select>
											)}
										</div>
										<div className="columns-holder-row">
											<h3>Duration</h3>
											  {getFieldDecorator('duration',{
										  			initialValue: job.duration
										  		})(
													<RadioGroup onChange={this.updateDuration}>
														<RadioButton size="large" value="a">1-3 Months</RadioButton>
														<RadioButton size="large" value="b">3-6 Months</RadioButton>
														<RadioButton size="large" value="c">More than 6 Months</RadioButton>
													</RadioGroup>
												)}											
										</div>
									</div>
								</div>
								<div className="columns">
									<h2>Desired Profile</h2>
									<div className="columns-holder columns2">
									  {getFieldDecorator('desired_profile',{
								  			initialValue: job.desired_profile
								  		})(
											<RadioGroup className="designation-radio-holder" size="large" onChange={this.updateDesiredProfile} >
												<RadioButton className="designation-radio-list" value="a"><span className="designation-radio-text">Junior</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
												<RadioButton className="designation-radio-list" value="b"><span className="designation-radio-text">Senior</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
												<RadioButton className="designation-radio-list" value="c"><span className="designation-radio-text">Expert</span><ReactSVG path={svg} className="designation-svg" /></RadioButton>
											</RadioGroup>
										)}
										<p>{this.state.desired_profile_description}</p>
										<h3>Max. Budget</h3>
										<FormItem>
						  					{getFieldDecorator('minimum_budget',{
						  					initialValue: job.minimum_budget,
											rules: [{
							  					required: true, message: 'Please enter amount in $'
											},{ validator: this.check_minimum_budget } ]
						  				})(
											<Input type="number" size="large" addonBefore="$" />
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
								  	initialValue: job.additional_info
								  }, {max: 400, message: 'Please enter less text for additional information'})(
									<TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />
								  )}
							</FormItem>
							
						</div>
						<Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>Submit</Button>
					</section>
				</div>
			</div>
		</Form>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
	skills_reducer: state.skills_reducer,
	id: ownProps.match.params.id,
	view_job_reducer: state.job_view_reducer,
	jobUpdateReducer: state.update_job_reducer,
	home_categories_reducer: state.home_categories_reducer,
  }
}
function mapDispatchToProps(dispatch) {
  return {
	fetchAllSkills: () => (dispatch(sActions.fetch())),
	save: (job_id, data) => (dispatch(hActions.submitForm(job_id, {job: data}))),

    fetchHomeCategory: () => {
      return dispatch(hcActions.fetchHomeCategory())
    },
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    }
  }
}

const wrappedJobEditWizardForm = Form.create()(EditJob);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobEditWizardForm);
