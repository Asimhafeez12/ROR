import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Rate, Tag, Icon } from 'antd';

import * as fajActions from './../../../actions/freelancer_active_jobs';
import moment from 'moment';


class ActiveJobs extends Component{


	componentWillMount() {
		this.props.fetchActiveJobs();
	}
	render(){
		const { active_jobs } = this.props.freelancer_active_jobs_reducer;

		return(
			<React.Fragment>
				{ active_jobs && active_jobs.length > 0 ? 
					<div className="heading-block">
						<h2>Active Jobs</h2>
					</div>
				: "" }
				{ active_jobs && active_jobs.map((val, index) => (
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
    freelancer_active_jobs_reducer: state.freelancer_active_jobs_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

	fetchActiveJobs: () => (dispatch(fajActions.fetch())),

   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);