import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import UserLanguageForm from './user_languages_form';
import * as ulActions from './../../actions/users/user_languages';
import Defender from './../../helpers/defender';


class UserLanguages extends Component {

    state = {
      modal_languages: false,
      showUserLanguageForm: false,
  	};

	componentWillMount() {
	   this.props.fetchUserLanguages(window.location.href.split('/')[4]);
	}

	toggleUserLanguageForm(e) {
	  e.preventDefault();
	  this.setState({
	    showUserLanguageForm: !this.state.showUserLanguageForm,
	    modal_languages: !this.state.modal_languages,
	  });
	}

	render() {
   		const { user_languages } = this.props.user_languages_reducer;
   		const { user } = this.props;
		return (
			<React.Fragment>
				<div className="spoken-languages-list">
					<div className="spoken-languages-header">
						<h3>Languages</h3>
				            { this.state.showUserLanguageForm ? <UserLanguageForm cancelFunc={this.toggleUserLanguageForm.bind(this)} modal_languages={this.state.modal_languages}/> : ''}
				            {Defender.currentUser().id === user.id ? 
				                <a className="languages-edit-btn" type="primary"><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" onClick={this.toggleUserLanguageForm.bind(this)} /></a>
				            : "" }
					</div>
					{user_languages && user_languages.length > 0 ?
						<ul>
							{user_languages && user_languages.map( (language, index) =>
								<li key={index}>
								  <dl>
									<dt>{language}</dt>
									<dd></dd>
								  </dl>
								</li>
							)}
						</ul>
					: ""
					}
				</div>
				<div className="spoken-languages-list">
					<div className="spoken-languages-header">
						<h3>Profile Link</h3>
					</div>
					<a className="language-link" href="">http://evolve.abc.com/Farhan</a>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, ownProps) {
 return {
   user_languages_reducer: state.user_languages_reducer,
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
 	fetchUserLanguages: (user_id) => {
    	dispatch(ulActions.fetch(user_id))
   	},
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLanguages);
