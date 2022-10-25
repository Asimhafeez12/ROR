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
					<h1>Contract an AI Engineer</h1>
					<h2>Choose Category</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.</p>
				</div>
				<div className="job-category-listing">
					<ul>
					{job_categories.map( (category, index) =>
						<li key={index}>
							<a href={'./job_creation/'+ category.id} >
								<div className="image-holder">
									<img src={category.avatar_url} alt="My img" />
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

const wrappedJobCreationWizardForm = Form.create()(JobCategory);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobCreationWizardForm);

