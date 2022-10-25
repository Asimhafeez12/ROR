import React, { Component } from 'react';
import { connect } from 'react-redux';

import Defender from './../../../../helpers/defender';
import WelcomeImage from '../../../../images/il_welcome.png';

class NotApproved extends Component{
	render(){
		document.body.classList.add('not-approved-page');
		return(
			<div className="not-approved-table">
				<div className="not-approved-table-cell">
					<div className="not-approved">
						<div className="not-approved-image">
							<img src={WelcomeImage} alt="Not Approved | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<div className="not-approved-content">
							<h1>Hi {Defender.currentUser().full_name}, Thanks for signing up</h1>
							<p>Please wait for the General Interview call on your scheduled time. It will be followed by a technical test and a technical interview. Once you’ve cleared all the steps, your account will be verified.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotApproved);