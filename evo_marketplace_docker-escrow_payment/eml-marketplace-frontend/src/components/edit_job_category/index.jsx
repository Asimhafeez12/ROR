import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import * as cActions from './../../actions/job_categories';
import * as jActions from './../../actions/update_job/update_job_category';
import * as vActions from './../../actions/jobs/view';


class EditJobCategory extends Component {

	componentWillMount() {
	    this.props.fetchJobCategory();
	    this.props.fetchViewJob(this.props.id);
	}

	  updateJobCategory(obj_job_category_id, e) {
	  	const job_id = this.props.id;
      	this.props.updateJobCategory(job_id, {job: {job_category_id: obj_job_category_id}} ).then((res) => {
	      });
	  }

	render(){
		const { job_categories } = this.props.job_categories_reducer;
		const job_id = this.props.id;

		document.body.classList.add('job_category_page');
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
							<a href={'/edit_job/'+ job_id} onClick={this.updateJobCategory.bind(this,category.id)} >
								<div className="image-holder">
									<img src={"http://localhost:8080"+category.avatar_url} alt="My img" />
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


function mapStateToProps(state, ownProps) {
  return {
    job_categories_reducer: state.job_categories_reducer,
    id: ownProps.match.params.id
  }
}
function mapDispatchToProps(dispatch) {
  return {

    fetchJobCategory: () => {
      return dispatch(cActions.fetchJobCategory())
    },
    updateJobCategory: (job_id, data) => {
      return dispatch(jActions.updateJobCategory(job_id, data))
    },
    fetchViewJob: (id) => {
      return dispatch(vActions.fetchViewJob(id))
    }
  }
}

const wrappedJobEditCategoryForm = Form.create()(EditJobCategory);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobEditCategoryForm);

