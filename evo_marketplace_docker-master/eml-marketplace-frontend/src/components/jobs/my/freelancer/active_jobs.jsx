import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';
import * as fajActions from './../../../../actions/freelancer_active_jobs';
import * as chatroomActions from './../../../../actions/user_chatrooms';
import ClientImage from './../../../../images/client_default.png';
import icNoJobs from './../../../../images/ic_no_jobs.png';
import moment from 'moment';
import Defender from './../../../../helpers/defender';


class ActiveJobs extends Component {

	state = {
		loading: true,
	}

	componentWillMount() {
		this.props.fetchActiveJobs(Defender.currentUser().id);
		
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	}


  render() {
	const { active_jobs } = this.props.freelancer_active_jobs_reducer;

	return (
		<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>			
			<div className="active-jobs">
				{active_jobs && active_jobs.length === 0 ?
					<div className="post-new-job-block">
						<div className="image-holder">
							<img src={icNoJobs} alt="No Jobs | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<h2>You have no <strong>Active Job.</strong></h2>
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
										<a href={`/profile/${job.user_id}`}>
											<div className="active-jobs-user-image">
					                            {!!job.user_avatar_url ?
					                                <React.Fragment>
					                                	<img src={job.user_avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
					                                </React.Fragment>
					                                :
					                                <img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" />
					                            }
											</div>
											<div className="active-jobs-user-details">
												<h3>Client</h3>
												<span> {job.user_full_name}</span>
											</div>
										</a>
									  </div>
								  </div>

								  <div className="active-jobs-right">
									<h2>Total Budget</h2>
									<span className="price-span">${(job.amount_paid_for_completed_milestones + job.amount_remaining_for_open_milestones)/100}</span>
									<div className="buttons-holder">
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
	freelancer_active_jobs_reducer: state.freelancer_active_jobs_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
	fetchActiveJobs: (user_id) => (dispatch(fajActions.fetch(user_id))),

	openChatroom: (data) => {
	  return dispatch(chatroomActions.openUserChatroom(data));
	},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);
