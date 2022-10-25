import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Icon, Rate} from 'antd';
import * as userActions from './../../actions/users/';
import * as icjActions from './../../actions/invited_completed_jobs';
import * as mActions from './../../actions/jobs/my';
import * as iajActions from './../../actions/invited_active_jobs';
import BasicInfoForm from './basic_info_form';
import moment from 'moment';
import ClientImage from '../../images/client_default.png';
import FreelancerImage from '../../images/freelancer_default.png';
import Defender from './../../helpers/defender';
import profile_banner from '../../images/profile-banner.png';


class ClientProfile extends Component {

	componentWillMount() {
		this.props.fetchMyJobs();
		this.props.fetchAllActiveJobs();
		this.props.fetchAllCompletedJobs();
		this.props.fetchViewUser(window.location.href.split('/')[4]);
	}

    state = {
	    modal_basic_info: false,
	    showBasicInfoForm: false,
	 };


	toggleBasicInfoForm(e) {
	    e.preventDefault();
	    this.setState({
	      showBasicInfoForm: !this.state.showBasicInfoForm,
	      modal_basic_info: !this.state.modal_basic_info,
	    });
	}


	render(){
	    const { user } = this.props.user_view_reducer;
		const { active_jobs } = this.props.invited_active_jobs_reducer;
		const { completed_jobs } = this.props.invited_completed_jobs_reducer;
		const { jobs } = this.props.my_jobs_reducer;

		return(
			<React.Fragment>
				{ user && Object.keys(user).length !== 0 ?
					<div className="client2-profile-holder">
						<div className="client2-profile-holder-left">
							<section className="client2-profile-section1">
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
											<li><Icon type="environment-o" style={{ color:'#ababab', fontSize:'16px', fontWeight:'400'}} /><address>{user.city} {user.country}</address></li>
											<li><Icon type="mail" style={{ color:'#ababab', fontSize:'16px', fontWeight:'400'}} />{Defender.currentUser().email}</li>
										</ul>
										{ this.state.showBasicInfoForm ? <BasicInfoForm cancelFunc={this.toggleBasicInfoForm.bind(this)} modal_basic_info={this.state.modal_basic_info}/> : ''}
										{Defender.currentUser().id === user.id ? 
										<a className="edit-btn" type="primary" onClick={this.toggleBasicInfoForm.bind(this)}><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" /></a>
										: "" }
									</div>
								</div>
								<div className="profile-content-bottom">
									<ul>
										<li>
											<h3>{user.job_count}</h3>
											<span>Total Jobs Posted</span>
										</li>
										<li>
											<h3>{user.freelancers_hired_count}</h3>
											<span>Total Hires</span>
										</li>
										<li>
											<h3>0</h3>
											<span>Total Spent</span>
										</li>
									</ul>
								</div>
							</section>

							<section className="client2-profile-section2-mobile">
								<div className="rating-holder">
									<h2>Overall Rating</h2>
									<h3>{user.average_job_rating_for_all_jobs}/5</h3>
									{<Rate style={{fontSize:'20px'}} disabled defaultValue={user.average_job_rating_for_all_jobs} />}
								</div>
							</section>
							
							<section className="client2-profile-section2">
								<h2>Jobs and Reviews</h2>
								{completed_jobs && completed_jobs.map( (job, index) =>
									<div key={index} className="client2-jobs-holder">
										<div className="heading-block">
											<h3>{job.title}</h3>
											<ul>
												<li><strong>AI Engineer : </strong>{job.accept_freelancers_list[0].user_full_name}</li>
												<li><time>{moment(job.created_at).format('MMMM YYYY')}</time></li>
											</ul>
											<span className="budget-text">${job.minimum_budget}</span>
										</div>
										<div className="body-block">
											{job.all_job_ratings_for_client && job.all_job_ratings_for_client.length > 0 ?
												<React.Fragment>
													{<Rate style={{fontSize:'12px'}} disabled defaultValue={job.all_job_ratings_for_client[0].overall_rating} />}
													<div className="reviews-get">
														{job.all_job_ratings_for_client[0].review}
													</div>
												</React.Fragment>
											: "" }
										</div>
									</div>
								)}

								{active_jobs && active_jobs.map( (job, index) =>
									<div key={index} className="client2-jobs-holder">
										<div className="heading-block">
											<h3>{job.title}</h3>
											<ul>
												<li><strong>AI Engineer : </strong>{job.accept_freelancers_list[0].user_full_name}</li>
												<li><time>{moment(job.created_at).format('MMMM YYYY')}</time></li>
											</ul>
											<span className="budget-text">${job.minimum_budget}</span>
										</div>
									</div>
								)}

								{jobs && jobs.map( (job, index) =>
									<div key={index} className="client2-jobs-holder">
										<div className="heading-block">
											<h3>{job.title}</h3>
											<ul>
												<li><time>{moment(job.created_at).format('MMMM YYYY')}</time></li>
											</ul>
											<span className="budget-text">${job.minimum_budget}</span>
										</div>
									</div>
								)}
							</section>
						</div>
						
						<div className="client2-profile-holder-right">
							<div className="rating-holder">
								<h2>Overall Rating</h2>
								<h3>{user.average_job_rating_for_all_jobs}/5</h3>
								{<Rate style={{fontSize:'20px'}} disabled defaultValue={user.average_job_rating_for_all_jobs} />}
							</div>
						</div>
					</div>
				: "" }
			</React.Fragment>
		);

	}  
}

function mapStateToProps(state, ownProps) {
  return {
    user_view_reducer: state.user_view_reducer,
    my_jobs_reducer: state.my_jobs_reducer,
    invited_active_jobs_reducer: state.invited_active_jobs_reducer,
    invited_completed_jobs_reducer: state.invited_completed_jobs_reducer,
  }
}

function mapDispatchToProps(dispatch) {
	return {
	    fetchViewUser: (id) => {
	      return dispatch(userActions.fetchViewUser(id))
	    },
	    fetchMyJobs: () => {
	      dispatch(mActions.fetchMyJobs())
	    },

	    fetchAllActiveJobs: () => {
	    	dispatch(iajActions.fetch())
	    },

	    fetchAllCompletedJobs: () => {
	    	dispatch(icjActions.fetch())
	    },
	}
}

const clientProfileEdit = Form.create()(ClientProfile);
export default connect(mapStateToProps, mapDispatchToProps)(clientProfileEdit);





