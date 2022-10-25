import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import * as cActions from './../../actions/job_categories';


class JobCategory extends Component {

	componentWillMount() {
	    this.props.fetchJobCategory();
	}

	render(){
		const { job_categories } = this.props.job_categories_reducer;
		//document.body.classList.add('job_category_page');
		return(
			<div className="job-category-holder">
				<div className="job-category-heading">
					<h1>Contract an AI Freelancer</h1>
					<h2>Choose Category</h2>
					<p>Please select the most appropriate category for your project</p>
				</div>
				<div className="job-category-listing">
					<ul>
					{job_categories.map( (category, index) =>
						<li key={index}>
							<a href={'./job_creation/category?'+ category.name} >
								<div className="image-holder">
									<img src={category.avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<div className="job-category-data">
									<div className="job-category-table">
										<div className="job-category-table-cell">
											<h2>{category.name}</h2>
											<p>{category.description}</p>
										</div>
									</div>
								</div>
							</a>
						</li>
						)}					
					</ul>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    job_categories_reducer: state.job_categories_reducer
  }
}
function mapDispatchToProps(dispatch) {
  return {

    fetchJobCategory: () => {
      return dispatch(cActions.fetchJobCategory())
    }
  }
}


const wrappedJobCategory = Form.create()(JobCategory);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobCategory);

