import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Skeleton } from 'antd';
import * as uexActions from './../../actions/users/user_experiences';
import UserExperienceForm from './user_experience_form';
import EditUserExperienceForm from './edit_user_experience_form';
import Defender from './../../helpers/defender';
import moment from 'moment';


class UserExperiences extends Component {

	state = {
	  loading2: true,
	  modal_experiences: false,
	  showUserExperienceForm: false,
	  modal_edit_experiences: false,
	  showEditUserExperienceForm: false,
	  selected_experience_id: 0,
    };


 componentWillMount() {
   this.props.fetchUserExperiences(window.location.href.split('/')[4]);
	setTimeout(() => {
		this.setState({ loading2: false });
	}, 2000);
 }

  toggleUserExperienceForm(e) {
	  e.preventDefault();
	  this.setState({
		showUserExperienceForm: !this.state.showUserExperienceForm,
		modal_experiences: !this.state.modal_experiences,
	  });
  }

  toggleEditUserExperienceForm(e) {
	  e.preventDefault();
	  this.setState({
		showEditUserExperienceForm: !this.state.showEditUserExperienceForm,
		modal_edit_experiences: !this.state.modal_edit_experiences,
	  });
  }

	removeExperience(obj_experience, e){
	  this.props.removeExperience(obj_experience);
	  this.props.fetchUserExperiences(Defender.currentUser().id);
	}

 render() {
   const { user_experiences } = this.props.user_experiences_reducer;
   const { user } = this.props;
   return (
		<section className="profile-section7">
			<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
				<h2 className="section-title">Professional Experience</h2>
				{ this.state.showUserExperienceForm ? <UserExperienceForm cancelFunc={this.toggleUserExperienceForm.bind(this)} modal_experiences={this.state.modal_experiences}/> : ''}
				{Defender.currentUser().id === user.id ? 
				<a className="profile-add-btn" type="primary" onClick={this.toggleUserExperienceForm.bind(this)}>Add Experience</a>
				: "" }

				{user_experiences && user_experiences.length > 0 ?
					<React.Fragment>
						{user_experiences && user_experiences.map( (experience, index) =>
						<div className="profile-section7-holder" key={index}>
						  <div className="profile-section7-top">
							<div className="profile-align-left">
							<h3>
							  	<span>{experience.designation}</span>
								<div className="section-button-holder">
									{Defender.currentUser().id === user.id ? 
									<a className="section-del-btn" type="primary" onClick={this.removeExperience.bind(this,experience.id)}><Icon type="delete" /></a>
									: "" }
									{ this.state.showEditUserExperienceForm ? <EditUserExperienceForm cancelFunc={this.toggleEditUserExperienceForm.bind(this)} modal_edit_experiences={this.state.modal_edit_experiences} user_experience={experience}/> : ''}
									{Defender.currentUser().id === user.id ? 
									<a className="section-edit-btn" type="primary" onClick={this.toggleEditUserExperienceForm.bind(this)}><Icon type="edit" /></a>
									: "" }
								</div>
							</h3>
							<h4>{experience.organization_name}</h4>
							</div>
							<div className="profile-align-right">
							  <ul>
								{experience.starting_date === null ? "" :
								  <li>{moment(experience.starting_date).format('MM/DD/YYYY')}</li>
								}
								  <li>-</li>
								{experience.ending_date === null ? "" :
								  <li>{moment(experience.ending_date).format('MM/DD/YYYY')}</li>
								}
							  </ul>
							</div>
						  </div>
						  <div className="profile-section7-bottom">
							<p>{experience.description}</p>
						  </div>
					</div>
					)}
					</React.Fragment>
				:
					<div className="no-content-block">
						<h4>No experience added yet.</h4>
					</div>
				}
			</Skeleton>
		</section>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   user_experiences_reducer: state.user_experiences_reducer,
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserExperiences: (user_id) => {
	 dispatch(uexActions.fetch(user_id))
   },
	removeExperience: (user_experience_id) => (dispatch(uexActions.remove(user_experience_id)))
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserExperiences);