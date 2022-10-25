import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mActions from './../../../actions/invited_openned_jobs';
import * as chatroomActions from './../../../actions/user_chatrooms';
import { Button, Icon, Tooltip, Rate } from 'antd';
import FreelancerImage from '../../../images/freelancer_default.png';

class OpennedJobs extends Component{

	componentWillMount() {
		this.props.fetchMyJobs();
	}

	destoryWindow(){
		var element = document.getElementById("chat-window");
		if(element){        
			element.parentNode.removeChild(element);
		}
	}
	minimize(){
		var element = document.getElementById("chat-window");
		var findClass = document.getElementsByClassName("minimized").length;
		if(findClass){
			element.classList.remove("minimized");
		} else {
			element.classList.add("minimized");
		}
	}

	render(){
		const { openned_jobs } = this.props.invited_openned_jobs_reducer;
		
		return(
			<React.Fragment>
				{openned_jobs && openned_jobs.map( (job, index) =>
					<div key={index} className="jobs-holder">
						{job.job_cover_letters}
						<div className="heading-block">
							<h3><a href={'./job/'+ job.id} >{job.title}</a></h3>
							<ul>
								<li>Category: {job.job_category}</li>
								<li>Posted on: <time>{job.created_at_format}</time></li>
								<li>Max. Budget: ${job.minimum_budget}</li>
							</ul>
							{job.job_cover_letter_count === 0 ?
								<Button href={'/edit_job/'+ job.id} size="large" className="edit-job-btn">Edit Job</Button>
							: "" }
						</div>
						{job.job_cover_letter_ids && job.job_cover_letter_ids.length > 0 ?
							<div className="home-freelancer-listing">
									<h2>Recommended AI Freelancers : {job.job_cover_letter_ids.length}</h2>
								<ul>
									{job.invited_freelancers_list && job.invited_freelancers_list.map( (ifl, index) =>
										<li key={index}>
											{ifl.job_cover_letter !== false ?
												<div className="home-freelancer-holder">
													<div className="left-content">
														<div className="image-holder">
															{!!ifl.user_avatar_url ?
																<React.Fragment>
																	<a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><img src={ifl.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
																</React.Fragment>
																:
																<a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
															}
														</div>
														<Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >
															  Message
														</Button>
														{job.state === "open" ?
															<Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
														: "" }
														<a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
													</div>
													<div className="right-content">
														<a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><h2>{ifl.user_full_name}</h2></a>
														<h3>{ifl.user_title}</h3>
														<div className="mobile-action-buttons">
															<ul>
																<li><Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >Message</Button></li>
																<li><Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button></li>
																<li><Button className="view-profile-btn" size="large" href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</Button></li>
															</ul>
														</div>
														 <ul>
															 {ifl.job_cover_letter !== false ?
																<li>Proposed Timeline: {ifl.job_cover_letter.expected_timeline} weeks</li>
															: "" }
															{ifl.freelancer_cover_letter_expected_amount ?
																<li>Proposed Budget: ${ifl.job_cover_letter.expected_amount}</li>
															: "" }
															<li>Proposed Budget: ${ifl.job_cover_letter.expected_amount}</li>
							                                {ifl.average_job_rating_for_all_jobs !== null ?
							                                  <li>Overall Rating: <Rate className="rating-block" style={{ fontSize:'16px' }} disabled value={ifl.average_job_rating_for_all_jobs} /></li>
							                                : "" }
														  </ul>
														  <p>{ifl.job_cover_letter.cover_letter}</p>
															{ifl.user_badge_list && ifl.user_badge_list.length > 0 ?
																<ul className="user-skills-list">
																	{ ifl.user_badge_list && ifl.user_badge_list.map((val, index) => (
		                                                                <li key={index} >
		                                                                    <strong>{val.badge_title} <Tooltip className="help-link" title={val.badge_description}><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></strong>
		                                                                    <span>Level: {val.badge_expert_level}</span>
								                                              <div className="badge-image">
								                                                <img src={val.badge_avatar_url} alt="Badge | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								                                              </div>
		                                                                </li>
																	))}
																</ul>
															: ""
															}
													</div>
												</div>
											: "" }
										</li>
									)}
								</ul>
							<React.Fragment>
								{job.state === "invited" ?
								<div className="pending-approval-holder">
									<h4>A job offer has been sent to freelancer, Job will be started once you and freelancer agree and accept the terms of the job</h4> 
								</div>
								: ""}
							</React.Fragment>
							</div>
						:
						<React.Fragment>
							{job.state === "open" ?
							<div className="pending-approval-holder">
								<h4>Pending approval and recommendations</h4> 
							</div>
							: ""}
						</React.Fragment>
						}
					</div>
				)}
			</React.Fragment>
		);
	}
}



function mapStateToProps(state) {
  return {
	auth: state.auth, 
	invited_openned_jobs_reducer: state.invited_openned_jobs_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {

	fetchMyJobs: () => {
	  dispatch(mActions.fetchAllOpennedJobs())
	},

	openChatroom: (data) => {
	  return dispatch(chatroomActions.openUserChatroom(data));
	},
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpennedJobs);

