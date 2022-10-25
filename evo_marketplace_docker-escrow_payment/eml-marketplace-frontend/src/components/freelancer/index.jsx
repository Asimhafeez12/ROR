import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, Icon, Tag, Select, AutoComplete, message} from 'antd';
import * as uActions from '../../actions/freelance_profile';
import * as iajActions from './../../actions/invited_active_jobs';
import * as sActions from './../../actions/skills';
import * as userActions from './../../actions/users/';
import * as afActions from './../../actions/accepted_freelancers';
import * as chatroomActions from './../../actions/user_chatrooms';
import * as jclActions from './../../actions/job_cover_letter';
import * as usActions from './../../actions/users/user_skills';
import * as vActions from './../../actions/jobs/view';
import Defender from './../../helpers/defender';
import UserLanguages from './user_languages';
import UserCertificates from './user_certificates';
import UserEducations from './user_educations';
import UserExperiences from './user_experiences';
import UserPortfolios from './user_portfolios';
import UserExpertiseWebView from './user_expertise_web_view';
import UserExpertiseMobileView from './user_expertise_mobile_view';
import UserCompletedJobs from './user_completed_jobs';
import UserAcceptedJobs from './user_accepted_jobs';
import BasicInfoForm from './basic_info_form';
import ClientProfile from './../clients';
import ClientImage from '../../images/client_default.png';
import FreelancerImage from '../../images/freelancer_default.png';
import profile_banner from '../../images/profile-banner.png';

const Option = Select.Option;


class FreelancerProfile extends Component {

	componentWillMount() {
		this.props.fetchAllSkills();
		this.props.fetchViewUser(window.location.href.split('/')[4]);
		this.props.fetchJobCoverLetter(window.location.href.split('/')[4], window.location.href.split('/')[6]);
		if (window.location.href.split('/')[6]){
			this.props.fetchViewJob(window.location.href.split('/')[6]);
		}
		this.props.fetchUserSkills(window.location.href.split('/')[4]);

	}

    state = {
		rate_value: 2,
		startValue: null,
		endValue: null,
		endOpen: false,
        confirmDirty: false,
		loading: false,
		iconLoading: false,
	    skillsList: Defender.currentUser().skill_list,
	    skillValue: '',
	    a: false,
	    modal_basic_info: false,
	    showBasicInfoForm: false,
	    modal_skills: false
	};


	toggleBasicInfoForm(e) {
	    e.preventDefault();
	    this.setState({
	      showBasicInfoForm: !this.state.showBasicInfoForm,
	      modal_basic_info: !this.state.modal_basic_info,
	    });
	}

	handleCancelSkills(e){
		e.preventDefault();
		this.setState({ modal_skills: false });
	}

	setModalSkills(modal_skills) {
		this.setState({ modal_skills });
	}


	enterLoading = () => {
		this.setState({ loading: !this.state.loading });
	}
	
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
	}

	onSelect = (value) => {
	    let { skillsList } = this.state;
	    if (skillsList.includes(value)){
	    	message.error("Skill already added");
	    }
	    else{
	    	skillsList.push(value);
	    	this.setState({skillsList: skillsList});
	    	}
	}

	onClose = (value) => {
	    this.setState({skillsList: this.state.skillsList.filter((sl) => (
	      value !== sl
	    ))});
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

    handleSubmitSkills = (e) => {
        e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	        if (!err) {
	            let  data = {}
	            data["skill_list"] = this.state.skillsList.join(", ");
	            this.props.save(data).then((res) => {
	            if (!this.props.freelancerProfile.success) {
	            } else {
	            	this.props.fetchUserSkills(Defender.currentUser().id);
	            	this.setModalSkills(false);
	          	}
	            });
	        }
			else {
				this.props.fetchUserSkills(Defender.currentUser().id);
			}
	    });
	}


	render(){
		document.body.classList.add('freelancer-profile-page');

		if (document.querySelector(".profile-holder-sidebar")){
			var sticky = {
			  sticky_after: 700,
			  init: function() {
			    this.header = document.querySelector(".profile-holder-sidebar")[0];
			    this.scroll();
			    this.events();
				this.pos();
			  },

			  scroll: function() {
				this.pos();
			    if(window.scrollY > this.sticky_after) {
			      	document.body.classList.add("scroll_active");
			    }
			    else {
			      document.body.classList.remove("scroll_active");
			    }
			  },

			  events: function() {
			    window.addEventListener("scroll", this.scroll.bind(this));
			  },

			  pos: function() {
			    var a = document.querySelector(".profile-holder").offsetLeft;
			    document.querySelector(".profile-holder-sidebar").style.right = a+"px";
			  }
			};
			document.addEventListener("DOMContentLoaded", sticky.init.bind(sticky));

		}


	    const { user } = this.props.user_view_reducer;
	    const {job_cover_letter} = this.props.job_cover_letter_reducer;	
	    const { user_skills } = this.props.user_skills_reducer;	
	    const { job } = this.props.view_job_reducer;
	    const { skills } = this.props.skills_reducer;
		const Complete = () => {
	    const children = skills.map((result) => {
	        return <Option key={result.name}>{result.name}</Option>
	    });
		return (
			<AutoComplete
			    style={{ width: '100%' }}
	          	onSelect={this.onSelect}
			    placeholder="Search Skills"
			    >
	        	{children}
				</AutoComplete>
			  );
		}
		return(
			<React.Fragment>
				{user.user_role && user.user_role.includes("freelancer") ?
					<div className="profile-holder">
						<div className="profile-banner-holder">
							<img src={profile_banner} alt="Profile Banner"/>
						</div>

						<div className="profile-holder-left">
							<section className="profile-section1">
								<div className="profile-content-top">
									<div className="profile-image-holder">
									  	{!!Defender.currentUser().avatar_url ?
									  		"" :
									  		<React.Fragment>
									  			{Defender.currentUser()._r.includes("freelancer") ?
									  				<img src={FreelancerImage} alt="User img" /> : ""
									  			}
									  			{Defender.currentUser()._r.includes("client") ?
									  				<img src={ClientImage} alt="User img" /> : ""
									  			}
									  		</React.Fragment>
									  	}
									</div>
									<div className="profile-content">
										<h2 className="user-name"><strong>{user.full_name}</strong><span className="status online"></span></h2>
										<h3 className="user-designation">{user.title}</h3>
										<ul>
											{!!user.city || !!user.country ?
												<li><address><Icon type="environment-o" style={{ color:'#ababab', fontSize:'16px', fontWeight:'400'}} />  {user.city} {user.country}</address></li>
											: "" }
											<li><strong>Local Time:</strong><span>2:58 pm</span></li>
										</ul>
									</div>
									{ this.state.showBasicInfoForm ? <BasicInfoForm cancelFunc={this.toggleBasicInfoForm.bind(this)} modal_basic_info={this.state.modal_basic_info}/> : ''}
									{Defender.currentUser().id === user.id ? 
									<a className="profile-edit-btn" type="primary" onClick={this.toggleBasicInfoForm.bind(this)}><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" /></a>
									: "" }
								</div>
								<div className="profile-content-bottom">
									<h4>Overview</h4>
									{!!user.summary ?
										<React.Fragment>
											<p>{user.summary}</p>
										</React.Fragment>
									:
										<div className="no-content-block">
											<h4>No overview added yet.</h4>
										</div>
									}
								</div>
							</section>

							<div className="profile-block-mobile1">
								{ Object.keys(user).length !== 0 ?
									<UserExpertiseMobileView user={user} />
								: "" }
								{ Object.keys(user).length !== 0 ?
									<UserLanguages user={user} />
								: "" }
							</div>
							
							{Defender.currentUser()._r.includes("client") && job.state !== undefined  && job.state === "open" ?
								<div className="profile-block-mobile2">
									<div className="button-holder">
										<Button type="primary" className="hire-btn" href={'/hire_freelancer/' + job.id + '/user/' + user.id} >Hire an Engineer</Button>
										<Button className="message-btn" onClick={ () => ( this.props.openChatroom({chatroom_id: user.current_chatroom_id, user_id: user.id, full_name: user.full_name, job_id: job.id }) ) } >Message</Button>
									</div>
								</div>
							: "" }

							{user.user_role && user.user_role.includes("client") && job_cover_letter.cover_letter !== undefined ? 
								<section className="profile-section2">
									<h2 className="section-title">Cover Letter</h2>
									<ul>
										<li><strong>Proposed Timeline : </strong><span>{job_cover_letter.expected_timeline}</span></li>
										<li><strong>Proposed Budget : </strong><span>${job_cover_letter.expected_amount}</span></li>
									</ul>
									<p>{job_cover_letter.cover_letter}</p>
								</section>
							: "" }							

							<section className="profile-section3">
								<h2 className="section-title">Skills & Endorsements</h2>
								{Defender.currentUser().id === user.id ? 
								<a className="profile-add-btn" type="primary" onClick={() => this.setModalSkills(true)}>Add Skillls</a>
								: "" }

								{user_skills && user_skills.length > 0 ?
									<React.Fragment>
										<ul className="profile-skill-list">
											{ user_skills && user_skills.map((val, index) => (
												<li key={index}>
													<span className="profile-skill-list-title">{val}</span>
												</li>
											))}
										</ul>
									</React.Fragment>
								:
									<div className="no-content-block">
										<h4>No skills added yet.</h4>
									</div>
								}
							</section>

							<section className="profile-section4">
								<h2 className="section-title">Reviews</h2>
								{user.total_job_count_for_freelancer > 0 ?
									<React.Fragment>
										<UserCompletedJobs user={user} />
										<UserAcceptedJobs user={user} />
									</React.Fragment>
								:
									<div className="no-content-block">
										<h4>No job added yet.</h4>
									</div>
								}
							</section>

							<UserPortfolios user={user} />
							<UserCertificates user={user} />
							<UserExperiences user={user} />
							<UserEducations user={user} />
						</div>

						<aside className="profile-holder-sidebar">
							{Defender.currentUser()._r.includes("client") && job.state !== undefined  && job.state === "open" ?
								<div className="block-white">
									<div className="button-holder">
										<Button type="primary" className="hire-btn" href={'/hire_freelancer/' + job.id + '/user/' + user.id} >Hire an Engineer</Button>
										<Button className="message-btn" onClick={ () => ( this.props.openChatroom({chatroom_id: user.current_chatroom_id, user_id: user.id, full_name: user.full_name, job_id: job.id }) ) } >Message</Button>
									</div>
								</div>
							: "" }
							<div className="block-white">
								{ Object.keys(user).length !== 0 ?
									<UserExpertiseWebView user={user} />
								: "" }
							</div>
							<div className="block">
								{ Object.keys(user).length !== 0 ?
									<UserLanguages user={user} />
								: "" }
							</div>
						</aside>

						<div className="popups-holder">
							<Modal
								title="Add Skills"
								centered
								visible={this.state.modal_skills}
								onOk={() => this.setModalSkills(false)}
								onCancel={() => this.setModalSkills(false)}
								footer={[
								<Form key={2} className="job-post-form" onSubmit={this.handleSubmitSkills.bind(this)}>
									<div className="content-block tag-holder">
										<div className="search-fields-holder">
											<Complete />
										</div>
										<div className="default-tags-list">
							            	{ 
							            		this.state.skillsList.map((val) => (
							                		<Tag closable onClose={() => this.onClose(val)} color="#1890ff" key={val}>{val}</Tag>
								             	)) 
								         	}
										</div>
									</div>
									<Button key="back" onClick={this.handleCancelSkills.bind(this)}>Cancel</Button>
									<Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
								</Form>
			         			]}
							>
							</Modal>					
						</div>
					</div>
				: <ClientProfile/>
			}
			</React.Fragment>
		);

	}  
}

function mapStateToProps(state) {
  return {
    skills_reducer: state.skills_reducer,
    user_view_reducer: state.user_view_reducer,
    invited_active_jobs_reducer: state.invited_active_jobs_reducer,
    user_certificates_reducer: state.user_certificates_reducer,
    user_educations_reducer: state.user_educations_reducer,
    user_portfolios_reducer: state.user_portfolios_reducer,
    user_experiences_reducer: state.user_experiences_reducer,
    job_cover_letter_reducer: state.job_cover_letter_reducer,
    view_job_reducer: state.job_view_reducer,
    freelancerProfile: state.freelancerProfile,
    user_skills_reducer: state.user_skills_reducer,
  }
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAllSkills: () => (dispatch(sActions.fetch())),

	    fetchViewUser: (id) => {
	      return dispatch(userActions.fetchViewUser(id))
	    },
	    fetchJobCoverLetter: (user_id, job_id) => {
	      return dispatch(jclActions.fetchJobCoverLetter(user_id, job_id))
	    },
	    openChatroom: (data) => {
	      return dispatch(chatroomActions.openUserChatroom(data));
	    },
	    acceptFreelancers: (job_id, data) => {
	      return dispatch(afActions.acceptFreelancers(job_id, data))
	      //return Promise.resolve();
	    },
	    fetchViewJob: (id) => {
	      return dispatch(vActions.fetchViewJob(id))
	    },
	    save: (data) => (dispatch(uActions.submitForm({user: data}))),

      	fetchAllJobs: () => (dispatch(iajActions.fetch())),

	    fetchUserSkills: (user_id) => {
	     dispatch(usActions.fetch(user_id))
	    }
	}
}

const freelancerProfileEdit = Form.create()(FreelancerProfile);
export default connect(mapStateToProps, mapDispatchToProps)(freelancerProfileEdit);





