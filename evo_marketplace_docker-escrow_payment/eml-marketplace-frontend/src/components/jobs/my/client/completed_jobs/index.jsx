import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Rate, Skeleton } from 'antd';
import * as iajActions from './../../../../../actions/invited_completed_jobs';
import FreelancerImage from './../../../../../images/freelancer_default.png';
import icNoJobs from './../../../../../images/ic_no_jobs.png';


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

	render() {
		const { completed_jobs } = this.props.invited_completed_jobs_reducer;
		return (
			<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>			
				<div className="completed-jobs">
					{completed_jobs && completed_jobs.length === 0 ?
						<div className="post-new-job-block">
							<div className="image-holder">
								<img src={icNoJobs} alt="No Jobs" />
							</div>
							<h2>You have no any <strong>Completed Job.</strong></h2>
						</div>
					:
					<React.Fragment>
						{completed_jobs.map( (job, index) =>
							<div className="completed-jobs-holder" key={index}>
								<div className="completed-jobs-left">
								  <h2><a href={`/job/${job.id}`}>{job.title}</a></h2>
								  <ul>
									  <li>Completed on:  <time>08/16/2018</time></li>
									  <li>Total Paid: ${parseFloat(job.minimum_budget).toLocaleString(navigator.languae, {minimumFractionDigits: 0})}</li>
									  {job.all_job_ratings_for_client ? 
										<li className="rating-li"><span>Rating Given: </span> <span><Rate style={{fontSize:'16px'}} disabled defaultValue={job.all_job_ratings_for_client[0].overall_rating} /></span></li>
										: <li className="rating-li"><span>Rating Given: </span> <span><Rate style={{fontSize:'16px'}} disabled defaultValue={0} /></span></li>
									  }
								  </ul>
								  <a href={`/profile/${job.accept_freelancers_list[0].user_id}`}>
									<div className="completed-jobs-user-holder">
									  <div className="completed-jobs-user-image">
			                            {!!job.accept_freelancers_list[0].user_avatar_url ?
			                                "" :
			                                <img src={FreelancerImage} alt="User img" />
			                            }
									  </div>
									  <div className="completed-jobs-user-details">
										  <h3>Engineer Hired</h3>
										  <span> {job.accept_freelancers_list[0].user_full_name}</span>
									  </div>
									</div>
								  </a>
								</div>
								<div className="completed-jobs-right">
								  <h2>Total Paid</h2>
								   <span className="price-span">${parseFloat(job.minimum_budget).toLocaleString(navigator.languae, {minimumFractionDigits: 0})}</span>
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
	invited_completed_jobs_reducer: state.invited_completed_jobs_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
	fetchAllJobs: () => (dispatch(iajActions.fetch()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);
