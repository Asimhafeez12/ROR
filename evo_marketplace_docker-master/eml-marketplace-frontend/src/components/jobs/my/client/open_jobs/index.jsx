import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mActions from './../../../../../actions/invited_openned_jobs';
import * as chatroomActions from './../../../../../actions/user_chatrooms';
import { Skeleton } from 'antd';
import icNoJobs from './../../../../../images/ic_no_jobs.png';


class PendingJobs extends Component {

	state = {
		loading: true,
	}

	componentWillMount() {
		this.props.fetchMyJobs();

		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
	}

	render() {
		const { openned_jobs } = this.props.invited_openned_jobs_reducer;
		return (
			<Skeleton loading={this.state.loading} title={{ width: '600px' }} paragraph={{row:3, width: '400px' }} active>			
			    <div className="pending-jobs">
					{openned_jobs && openned_jobs.length === 0 ?
						<div className="post-new-job-block">
							<div className="image-holder">
								<img src={icNoJobs} alt="No Jobs | Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<h2>You have no <strong>Pending Job.</strong></h2>
						</div>
					:
						<React.Fragment>
							{openned_jobs.map( (job, index) =>
								<div className="pending-jobs-holder" key={index}>
								   <h2><a href={`/job/${job.id}`}>{job.title}</a></h2>
								   <ul>
									 <li>Category: {job.job_category}</li>
									 <li>Posted on: <time>{job.created_at_format}</time></li>
									 <li>Max. Budget: ${parseFloat(job.minimum_budget).toLocaleString(navigator.languae, {minimumFractionDigits: 0})}</li>
								   </ul>
									 {job.is_approved ?
									 (
									 <dl className="status rejected">
									 <dt>Status: </dt>
									 <dd>APPROVED</dd>
									 </dl>
									 ) :
									 (
									   <dl className="status pending">
										 <dt>Status: </dt>
										 <dd>PENDING</dd>
									   </dl>
									 )
								   }
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
	}
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(PendingJobs);