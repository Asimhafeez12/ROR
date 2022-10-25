import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Skeleton } from 'antd';
import * as ueActions from './../../actions/users/user_educations';
import UserEducationForm from './user_education_form';
import EditUserEducationForm from './edit_user_education_form';
import Defender from './../../helpers/defender';

import moment from 'moment';


class UserEducations extends Component {

	state = {
	  loading2: true,
	  modal_educations: false,
	  showUserEducationForm: false,
	  modal_edit_educations: false,
	  showEditUserEducationForm: false,
	  selected_education_id: 0,
  };


 componentWillMount() {
	setTimeout(() => {
		this.setState({ loading2: false });
	}, 2000);
   this.props.fetchUserEducations(window.location.href.split('/')[4]);
 }

  toggleUserEducationForm(e) {
	  e.preventDefault();
	  this.setState({
		showUserEducationForm: !this.state.showUserEducationForm,
		modal_educations: !this.state.modal_educations,
	  });
  }

  toggleEditUserEducationForm(e) {
	  e.preventDefault();
	  this.setState({
		showEditUserEducationForm: !this.state.showEditUserEducationForm,
		modal_edit_educations: !this.state.modal_edit_educations,
	  });
  }
  
	removeEducation(obj_education, e){
	  this.props.removeEducation(obj_education);
	  this.props.fetchUserEducations(Defender.currentUser().id);
	}

 render() {
   const { user_educations } = this.props.user_educations_reducer;
   const { user } = this.props;
   return (
	  <section className="profile-section8">
		<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
			<h2 className="section-title">Education History</h2>
			{ this.state.showUserEducationForm ? <UserEducationForm cancelFunc={this.toggleUserEducationForm.bind(this)} modal_educations={this.state.modal_educations}/> : ''}
			{Defender.currentUser().id === user.id ? 
			<a className="profile-add-btn" type="primary" onClick={this.toggleUserEducationForm.bind(this)}>Add Education</a>
			: "" }
			{user_educations && user_educations.length > 0 ?
				<React.Fragment>
					{user_educations && user_educations.map( (education, index) =>
					<div className="profile-section7-holder" key={index}>
					  <div className="profile-section8-top">
						<div className="profile-align-left">
							<h3>
								<span>{education.degree_name}</span>
								<div className="section-button-holder">
									{Defender.currentUser().id === user.id ? 
									<a className="section-del-btn" type="primary" onClick={this.removeEducation.bind(this,education.id)}><Icon type="delete" /></a>
									: "" }
									{ this.state.showEditUserEducationForm ? <EditUserEducationForm cancelFunc={this.toggleEditUserEducationForm.bind(this)} modal_edit_educations={this.state.modal_edit_educations} user_education={education}/> : ''}
									{Defender.currentUser().id === user.id ? 
									<a className="section-edit-btn" type="primary" onClick={this.toggleEditUserEducationForm.bind(this)}><Icon type="edit" /></a>
									: "" }  
								</div>
							</h3>
						  <h4>{education.institute_name}</h4>
						</div>
						<div className="profile-align-right">
						  <ul>
							{education.starting_date === null ? "" :
							  <li>{moment(education.starting_date).format('MM/DD/YYYY')}</li>
							}
							  <li>-</li>
							{education.ending_date === null ? "" :
							  <li>{moment(education.ending_date).format('MM/DD/YYYY')}</li>
							}
						  </ul>
						</div>
					  </div>
					  <div className="profile-section8-bottom">
						<p>{education.description}</p>
					  </div>
				</div>
				)}
				</React.Fragment>
			:
				<div className="no-content-block">
					<h4>No education added yet.</h4>
				</div>
			}
		</Skeleton>
	  </section>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   user_educations_reducer: state.user_educations_reducer,
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserEducations: (user_id) => {
	 dispatch(ueActions.fetch(user_id))
   },
	removeEducation: (user_education_id) => (dispatch(ueActions.remove(user_education_id))),
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEducations);