import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Skeleton } from 'antd';
import * as iajActions from './../../../../../actions/invited_active_jobs';
import * as chatroomActions from './../../../../../actions/user_chatrooms';
import * as icjActions from './../../../../../actions/invited_completed_jobs';
import icNoJobs from './../../../../../images/ic_no_jobs.png';
import moment from 'moment';
import FreelancerImage from './../../../../../images/freelancer_default.png';


class ActiveJobs extends Component {

	state = {
		loading: true,
	}

	componentWillMount() {
		this.props.fetchAllJobs();
		
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	}

	confirm = (obj_job, e) => {
		const that = this;
			Modal.confirm({
			title: 'Do you want to close this job?',
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			onOk(){
			that.props.acceptJob(obj_job.id);
			window.location = '/add_review_rating/' + obj_job.id;
			}
		});
	}

	render() {
		const { active_jobs } = this.props.invited_active_jobs_reducer;
		return (
			<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>			
				<div className="active-jobs">
					{active_jobs && active_jobs.length === 0 ?
						<div className="post-new-job-block">
							<div className="image-holder">
								<img src={icNoJobs} alt="No Jobs" />
							</div>
							<h2>You have no any <strong>Active Job.</strong></h2>
						</div>
					:
						<React.Fragment>
							{active_jobs.map( (job, index) =>
								<div className="active-jobs-holder" key={index}>
									<div className="active-jobs-left">
									  <h2><a href={`/job/${job.id}`}>{job.title}</a></h2>
									  <ul>
										  <li>Posted on: <time>{job.created_at_format}</time></li>
										  <li>Hire on:  <time>{moment(job.hired_on).format('MM/DD/YYYY')}</time></li>
										  <li>Deadline:  <time>08/16/2018</time></li>
									  </ul>
										  <div className="active-jobs-user-holder">
											<a href={`/profile/${job.accept_freelancers_list[0].user_id}`}>
												<div className="active-jobs-user-image">
						                            {!!job.accept_freelancers_list[0].user_avatar_url ?
						                                "" :
						                                <img src={FreelancerImage} alt="User img" />
						                            }
												</div>
												<div className="active-jobs-user-details">
													<h3>Engineer Hired</h3>
													<span> {job.accept_freelancers_list[0].user_full_name}</span>
												</div>
											</a>
										  </div>
									  </div>
									  <div className="active-jobs-right">
										<h2>Total Budget</h2>
										<span className="price-span">${parseFloat(job.minimum_budget).toLocaleString(navigator.languae, {minimumFractionDigits: 0})}</span>
										<div className="buttons-holder">
											<Button onClick={this.confirm.bind(this, job)} >End Job</Button>
											<Button href={`/job/${job.id}`} className="view-job-details" size="large">View Job Details</Button>
										</div>
									  </div>
								</div>
							)}
						</React.Fragment>
					}
				</div>
			</Skeleton>
		);
	}
}

function mapStateToProps(state) {
	return {
		invited_active_jobs_reducer: state.invited_active_jobs_reducer,
	};
}

function mapDispatchToProps(dispatch) {
  return {
	fetchAllJobs: () => (dispatch(iajActions.fetch())),

	openChatroom: (data) => {
	  return dispatch(chatroomActions.openUserChatroom(data));
	},
	acceptJob: (job_id) => {
	  return dispatch(icjActions.AcceptJobs(job_id))
	}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);
