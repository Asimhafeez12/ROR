import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Skeleton } from 'antd';
import * as rActions from './../../../actions/auth/resend_confirmation';
import * as userActions from './../../../actions/users';
import Defender from './../../../helpers/defender';
import UserExpertise from './user_expertise';
import CompletedJobs from './completed_jobs';
import ActiveJobs from './active_jobs';
import InvitedJobs from './invited_jobs';
import NotApproved from './not_approved';
import ClientImage from '../../../images/client_default.png';
import FreelancerImage from '../../../images/freelancer_default.png';
import ProfileCompleteWeb from './../../freelancer/profile_complete_web';
import ProfileCompleteMobile from './../../freelancer/profile_complete_mobile';




class Freelancer extends Component{

	state = {
		loading: true,
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1000);
		if (Defender.currentUser()){
			this.props.fetchViewUser(Defender.currentUser().id);
		}
	}

    handleSubmit = (e) => {
        var element = document.getElementById("resend_confirmation");
        if(element){
            element.setAttribute("disabled", true);
        }
        this.props.resendConfirmation().then( res => {
            this.props.updateCurrentUser();
            //setTimeout(function(){return window.location.reload();}, 10)
        });
    }

	render(){
        if (Defender.currentUser()){
        	document.body.classList.add("home-page-body");
        }
        else{
            window.location = "/sign_in";
        }
        const { user } = this.props.user_view_reducer;
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
                        {Defender.currentUser().resend_confirmation !== true ?
                            <Button id="resend_confirmation" className="home-resend-btn" type="primary" onClick={this.handleSubmit.bind()}>Resend</Button>
                        :   <Button id="resend_confirmation" disabled = "disabled" className="home-resend-btn" type="primary" onClick={this.handleSubmit.bind()}>Resend</Button> 
                        }               
                    </div>
                }
				{Defender.currentUser().is_approved === true ?
					<main className="home-main">
						<aside className="home-sidebar">
							<div className="home-sidebar-block">
								<div className="my-image">
									<Skeleton loading={this.state.loading} avatar={{ size: 'large' }} title={false} paragraph={false} active>
		                                {!!Defender.currentUser().avatar_url ?
		                                	<React.Fragment>
		                                    	<a href={"/profile/"+Defender.currentUser().id}><img src={Defender.currentUser().avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
		                                    </React.Fragment>
		                                    :
		                                    <React.Fragment>
		                                        {Defender.currentUser()._r.includes("freelancer") ?
		                                            <a href={"/profile/"+Defender.currentUser().id}><img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /></a> : ""
		                                        }
		                                        {Defender.currentUser()._r.includes("client") ?
		                                            <a href={"/profile/"+Defender.currentUser().id}><img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" /></a> : ""
		                                        }
		                                    </React.Fragment>
		                                }
									</Skeleton>
								</div>

	                            <React.Fragment>
									<Skeleton loading={this.state.loading} paragraph={{row:2 }} active>
										<strong className="my-name">{Defender.currentUser().full_name}</strong>
										<span className="my-designation">{Defender.currentUser().title}</span>
										<Button href={'/profile/' + Defender.currentUser().id} className="outline-btn my-profile-btn">My Profile</Button>
									</Skeleton>
	                            </React.Fragment>
							</div>
								{ Defender.currentUser() && Object.keys(Defender.currentUser()).length !== 0 ?
									<UserExpertise user={Defender.currentUser()} />
								: ""
								}
							<div className="profile-block-mobile3">
								{ Object.keys(user).length !== 0 ?
									<ProfileCompleteWeb user={user} />
								: "" }
							</div>

						</aside>
						<div className="freelancer-home-main-holder">
							<React.Fragment>
								<Skeleton loading={this.state.loading} title={{ width: '200px' }} paragraph={{row:3, width: '100%' }} active>
									<InvitedJobs/>
								</Skeleton>
							</React.Fragment>
							<React.Fragment>
								<Skeleton loading={this.state.loading} title={{ width: '200px' }} paragraph={{row:3, width: '100%' }} active>
									<ActiveJobs/>
								</Skeleton>
							</React.Fragment>
							<React.Fragment>
								<Skeleton loading={this.state.loading} title={{ width: '200px' }} paragraph={{row:3, width: '100%' }} active>
									<CompletedJobs/>
								</Skeleton>
							</React.Fragment>
						</div>
					</main>
				: 
					<NotApproved />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    freelancer_dashboard_reducer: state.freelancer_reducer,
    user_view_reducer: state.user_view_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    resendConfirmation: () => {
      return dispatch(rActions.resendConfirmation())
    },
    updateCurrentUser: () => (dispatch(userActions.updateCurrentUser())),

	fetchViewUser: (id) => {
	  return dispatch(userActions.fetchViewUser(id))
	},
   }
}


const FreelancerForm = Form.create()(Freelancer);
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerForm);