import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button } from 'antd';

import * as rActions from './../../../actions/auth/resend_confirmation';
import Defender from './../../../helpers/defender';
import UserExpertise from './user_expertise';
import CompletedJobs from './completed_jobs';
import ActiveJobs from './active_jobs';
import InvitedJobs from './invited_jobs';

import ClientImage from '../../../images/client_default.png';
import FreelancerImage from '../../../images/freelancer_default.png';


class Freelancer extends Component{

	resendConfirmation = (e) => {
        this.props.resendConfirmation().then( res => {
        	setTimeout(function(){return window.location.reload();}, 10)

         });
  }

	render(){
		document.body.classList.add("home-page-body");
		//const { getFieldDecorator } = this.props.form;

		return(
			<div className="freelancer-home-page">
				{ Defender.currentUser().is_confirmed ? "" 
				:
					<div className="confirmation-msg">
						<div className="confirmation-msg-holder">
							<strong>Please confirm your email - Confirmation details has been sent to your email</strong>
							<p>We know it's boring, But we need to make sure you entered the correct email to send you updates.</p>
						</div>
						<Button className="home-resend-btn" type="primary" onClick={this.resendConfirmation.bind()}>Resend</Button>				
					</div>
				}
				<main className="home-main">
					<aside className="home-sidebar">
						<div className="home-sidebar-block">
							<div className="my-image">
                                {!!Defender.currentUser().avatar_url ?
                                    "" :
                                    <React.Fragment>
                                        {Defender.currentUser()._r.includes("freelancer") ?
                                            <a href={"/profile/"+Defender.currentUser().id}><img src={FreelancerImage} alt="User img" /></a> : ""
                                        }
                                        {Defender.currentUser()._r.includes("client") ?
                                            <a href={"/profile/"+Defender.currentUser().id}><img src={ClientImage} alt="User img" /></a> : ""
                                        }
                                    </React.Fragment>
                                }
							</div>
							<strong className="my-name">{Defender.currentUser().full_name}</strong>
							<span className="my-designation">{Defender.currentUser().title}</span>
							<Button href={'/profile/' + Defender.currentUser().id} className="outline-btn my-profile-btn">My Profile</Button>
						</div>
							{ Defender.currentUser() && Object.keys(Defender.currentUser()).length !== 0 ?
								<UserExpertise user={Defender.currentUser()} />
							: ""
							}
					</aside>
					<div className="freelancer-home-main-holder">
						<InvitedJobs/>
						<ActiveJobs/>
						<CompletedJobs/>
					</div>
				</main>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    freelancer_dashboard_reducer: state.freelancer_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    resendConfirmation: () => {
      return dispatch(rActions.resendConfirmation())
    }
   }
}


const FreelancerForm = Form.create()(Freelancer);
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerForm);