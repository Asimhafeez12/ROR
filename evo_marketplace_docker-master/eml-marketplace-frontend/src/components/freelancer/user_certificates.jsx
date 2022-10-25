import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Skeleton } from 'antd';
import * as ucActions from './../../actions/users/user_certificates';
import UserCertificateForm from './user_certificate_form';
import EditUserCertificateForm from './edit_user_certificate_form';
import Defender from './../../helpers/defender';

import moment from 'moment';

class UserCertificates extends Component {

	state = {
		loading2: true,
		modal_certificates: false,
		showUserCertificateForm: false,
		certificate: null,
		modal_edit_certificates: false,
		showEditUserCertificateForm: false,
		selected_certificate_id: 0,
	};


 componentWillMount() {
   this.props.fetchUserCertificates(window.location.href.split('/')[4]);
	setTimeout(() => {
		this.setState({ loading2: false });
	}, 2000);
 }

  toggleUserCertificateForm(e) {
	  e.preventDefault();
	  this.setState({
		showUserCertificateForm: !this.state.showUserCertificateForm,
		modal_certificates: !this.state.modal_certificates,
	  });
  }

  toggleEditUserCertificateForm(certificate, e) {
	  e.preventDefault();
	  this.setState({
		showEditUserCertificateForm: !this.state.showEditUserCertificateForm,
		modal_edit_certificates: !this.state.modal_edit_certificates,
		certificate: certificate
	  });
  }
  cancelEditForm = () => {
	this.setState({
	  showEditUserCertificateForm: !this.state.showEditUserCertificateForm,
	  modal_edit_certificates: !this.state.modal_edit_certificates,
	  certificate: null,
	});
  }
  removeCertificate(obj_certificate, e){
	this.props.removeCertificate(obj_certificate);
	this.props.fetchUserCertificates(Defender.currentUser().id);
  }

 render() {
   const { user_certificates } = this.props.user_certificates_reducer;
   const { user } = this.props;
   return (
		<section className="profile-section6">
			<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
				<h2 className="section-title">Certifications</h2>
				{ this.state.showUserCertificateForm ? <UserCertificateForm cancelFunc={this.toggleUserCertificateForm.bind(this)} modal_certificates={this.state.modal_certificates}/> : ''}
				{Defender.currentUser().id === user.id ? 
					<a className="profile-add-btn" type="primary" onClick={this.toggleUserCertificateForm.bind(this)}>Add Certificate</a>
				: "" }
				{ this.state.showEditUserCertificateForm  ? <EditUserCertificateForm cancelFunc={this.cancelEditForm.bind(this)} modal_edit_certificates={this.state.modal_edit_certificates} user_certificate={this.state.certificate}/> : ''}
				
				{user_certificates && user_certificates.length > 0 ?
				  <React.Fragment>
					  {user_certificates && user_certificates.map( (certificate, index) =>
					  <div className="profile-section6-holder" key={index}>
						<div className="profile-section6-top">
						  <div className="profile-align-left">
							<h3>
								<span>{certificate.title}</span>
								<div className="section-button-holder">
									{Defender.currentUser().id === user.id ? 
									<a className="section-del-btn" type="primary" onClick={this.removeCertificate.bind(this,certificate.id)}><Icon type="delete" /></a>
									: "" }
									{Defender.currentUser().id === user.id ? 
									<a className="section-edit-btn" type="primary" onClick={this.toggleEditUserCertificateForm.bind(this, certificate)}><Icon type="edit" /></a>
									: "" }
								</div>
							</h3>
							<h4>{certificate.institution_name}</h4>
						  </div>
						  <div className="profile-align-right">
							<ul>
							  {certificate.starting_date === null ? "" :
								<li>{moment(certificate.starting_date).format('MM/DD/YYYY')}</li>
							  }
								<li>-</li>
							  {certificate.ending_date === null ? "" :
								<li>{moment(certificate.ending_date).format('MM/DD/YYYY')}</li>
							  }
							</ul>
						  </div>
						</div>
						<div className="profile-section6-bottom">
							<p>{certificate.description}</p>
						</div>
					</div>
				  )}
				  </React.Fragment>
				:
				  <div className="no-content-block">
					<h4>No certificate added yet.</h4>
				  </div>
				}
			</Skeleton>
		</section>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   user_certificates_reducer: state.user_certificates_reducer,
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserCertificates: (user_id) => {
	 dispatch(ucActions.fetch(user_id))
   },
   removeCertificate: (user_certifcate_id) => (dispatch(ucActions.remove(user_certifcate_id))),
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCertificates);