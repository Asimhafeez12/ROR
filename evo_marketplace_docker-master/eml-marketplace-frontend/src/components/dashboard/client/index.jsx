import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as rActions from './../../../actions/auth/resend_confirmation';
import * as clientActiveJobsActions from './../../../actions/client_active_jobs';
import * as clientOpennedJobsActions from './../../../actions/client_openned_jobs';
import Defender from './../../../helpers/defender';
import * as userActions from './../../../actions/users';
import { Button } from 'antd';
import icNoJobs from '../../../images/ic_no_jobs.png';
import ClientImage from '../../../images/client_default.png';
import FreelancerImage from '../../../images/freelancer_default.png';
import OpennedJobs from './openned_jobs';
import ActiveJobs from './active_jobs';


class Client extends Component{

    componentWillMount() {
        this.props.fetchActiveJobsCount();
        this.props.fetchOpennedJobsCount();
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
        document.body.classList.add("home-page-body");
        document.body.classList.add("client-home-page");
        const { client_active_jobs } = this.props.client_active_jobs_reducer;
        const { client_openned_jobs } = this.props.client_openned_jobs_reducer;

        return(
            <div className="home-page">
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
                <div className="home-header">
                    {
                        client_openned_jobs > 0 ?
                        <h3 className="posted-job-heading">Posted Jobs</h3>
                        : "" 
                    }
                    <a href="./job_creation"><Button className="post-job-btn" type="primary" size="large">Post A New Job</Button></a>
                </div>
                <main className="home-main">
                    <aside className="home-sidebar">
                        <div className="home-sidebar-block">
                            <div className="my-image">
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
                            </div>
                            <strong className="my-name">{Defender.currentUser().first_name} {Defender.currentUser().last_name}</strong>
                            <span className="my-designation">{Defender.currentUser().title}</span>
                            {!!Defender.currentUser().title ?
                                "" :
                                <a href="/client_wizard_profile" className="add-title">- Add title</a>
                            }
                            {!!Defender.currentUser().avatar_url ?
                                "" :
                                <a href="/client_wizard_profile" className="add-photo-profile">- Add profile photo</a>
                            }
                            {!!Defender.currentUser().avatar_url && !!Defender.currentUser().title ?
                                <Button className="my-profile-btn" href={"/profile/"+Defender.currentUser().id} type="primary">My Profile</Button>
                            : <Button className="my-profile-btn" href="/client_wizard_profile" type="primary">Complete Profile</Button>
                            }
                        </div>
                    </aside>
                    <div className="home-main-holder">
                        <h3 className="mobile-posted-job-heading">Posted Jobs</h3>
                        {client_openned_jobs === 0 && client_active_jobs === 0 ?
                            <div className="post-new-job-block">
                                <div className="image-holder">
                                    <img src={icNoJobs} alt="No Jobs | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                                </div>
                                <h2>Hi <strong>{Defender.currentUser().first_name} {Defender.currentUser().last_name}!</strong> You have no posted job.<br /> Let's post a new job.</h2>
                                <Button href="./job_creation" className="post-new-job-btn" type="primary" size="large">Post A New Job</Button>
                            </div>
                        :
                        <React.Fragment>
                            <OpennedJobs/>
                            <ActiveJobs/>
                        </React.Fragment>
                        }
                    </div>
                </main>
            </div>
        );
    }
}



function mapStateToProps(state) {
  return {
    auth: state.auth,
    client_active_jobs_reducer: state.client_active_jobs_reducer,
    client_openned_jobs_reducer: state.client_openned_jobs_reducer, 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resendConfirmation: () => {
      return dispatch(rActions.resendConfirmation())
    },
    fetchActiveJobsCount: () => {
      dispatch(clientActiveJobsActions.fetch())
    },
    fetchOpennedJobsCount: () => {
      dispatch(clientOpennedJobsActions.fetch())
    },
    updateCurrentUser: () => (dispatch(userActions.updateCurrentUser())),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);

