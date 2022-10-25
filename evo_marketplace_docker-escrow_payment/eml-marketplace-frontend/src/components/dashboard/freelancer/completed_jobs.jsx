import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Rate, Tag, Icon } from 'antd';

import * as fcjActions from './../../../actions/freelancer_completed_jobs';
import moment from 'moment';


class CompletedJobs extends Component{

	componentWillMount() {
		this.props.fetchCompletedJobs();
	}
	render(){
		const { completed_jobs } = this.props.freelancer_completed_jobs_reducer;

		return(
			<React.Fragment>
				{ completed_jobs && completed_jobs.length > 0 ? 
					<div className="heading-block">
						<h2>Completed Jobs</h2>
					</div>
				: "" }
				{ completed_jobs && completed_jobs.map((val, index) => (
					<div className="body-block" key={index}>
						<div className="block-title">
							<a href={'/job/'+ val.id} >
								<div className="block-title">
									<h3>{val.title}</h3>
									<span className="price-span">${val.minimum_budget}</span>
								</div>
								<span className="category-span">Category: {val.job_category}</span>
							</a>
						</div>
						<ul>
							<li><Icon type="clock-circle" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>{moment(val.created_at).fromNow()}</span></li>
							<li><Icon type="user" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>{val.user_country}</span><Rate style={{fontSize:'12px'}} disabled defaultValue={val.average_job_rating_for_all_jobs_for_job_client} /></li>
							{val.job_client_payment_status === false ?
								<li><Icon type="credit-card" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>Unverified</span></li>
							:
								<li><Icon type="credit-card" theme="outlined" style={{color: '#bfbfbf', fontSize:'16px'}} /><span>Verified</span></li>
							}
						</ul>
							<div className="tag-list-holder">
								{val.skill_list && val.skill_list.length > 0 ?
								<ul>
									{ val.skill_list && val.skill_list.map((value, index) => (
										<li key={index}><Tag>{value}</Tag></li>
									))}
									{/*<li><span className="more-tags">+2</span></li>*/}
								</ul>
								: "" }
							</div>								
							<div className="body-detail">
								<p>{val.description}{/*<a href="">more</a>*/}</p>
							</div>
					</div>
				))}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    freelancer_completed_jobs_reducer: state.freelancer_completed_jobs_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

	fetchCompletedJobs: () => (dispatch(fcjActions.fetch())),

   }
}


export default connect(mapStateToProps, mapDispatchToProps)(CompletedJobs);