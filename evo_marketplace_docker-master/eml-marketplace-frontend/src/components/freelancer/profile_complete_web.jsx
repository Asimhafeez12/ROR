import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Slider, Tooltip, Skeleton } from 'antd';
//import UserLanguageForm from './user_languages_form';
//import * as ulActions from './../../actions/users/user_languages';
import Defender from './../../helpers/defender';


class ProfileCompleteWeb extends Component {

    state = {
  	};

	componentWillMount() {
	}


	render() {
   		const { user } = this.props;
		return (
			<React.Fragment>
				<div className="home-sidebar-block block-white profile-completion-block">
					<Skeleton loading={this.state.loading} paragraph={{row:2 }} active>
						<h2>Profile Completeness <Tooltip className="help-link" title="Profile Completion"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></h2>
						<div className="profile-completion-slider-holder">
							<div className="profile-completion-slider">
								<Slider defaultValue={user.profile_score} tooltipVisible disabled />
							</div>
							<span className="percentage-complete">{user.profile_score}%</span>
						</div>

						<div className="percentage-complete-list">
							<ul>
								{user.avatar_url === null || user.avatar_url === "" ?
									<li>- Add Profile Photo.</li>
								: "" }
								{user.title === null || user.title === "" ?
									<li>- Add Title.</li>
								: "" }
								{user.summary === null || user.summary === "" ?
									<li>- Add Overview.</li>
								: "" }
								{user.skill_list_count === 0 ?
									<li>- Add Skills.</li>
								: "" }
								{user.portfolio_count === 0 ?
									<li>- Add Portfolio.</li>
								: "" }
								{user.certificate_count === 0 ?
									<li>- Add Certifications.</li>
								: "" }
								{user.experience_count === 0 ?
									<li>- Add Professional Experience.</li>
								: "" }
								{user.education_count === 0 ?
									<li>- Add Education History.</li>
								: "" }
								{user.language_count === 0 ?
									<li>- Add Languages.</li>
								: "" }
							</ul>
						</div>
					</Skeleton>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, ownProps) {
 return {
   user: ownProps.user
 };
}

function mapDispatchToProps(dispatch) {
 return {
 	// fetchUserLanguages: (user_id) => {
  //   	dispatch(ulActions.fetch(user_id))
  //  	},
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompleteWeb);
