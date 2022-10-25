import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as iajActions from './../../../actions/invited_active_jobs';
import * as chatroomActions from './../../../actions/user_chatrooms';
import { Button, Icon, Tooltip } from 'antd';
import FreelancerImage from '../../../images/freelancer_default.png';


class ActiveJobs extends Component{

    componentWillMount() {
        this.props.fetchAllActiveJobs();
    }

    destoryWindow(){
        var element = document.getElementById("chat-window");
        if(element){        
            element.parentNode.removeChild(element);
        }
    }
    minimize(){
        var element = document.getElementById("chat-window");
        var findClass = document.getElementsByClassName("minimized").length;
        if(findClass){
            element.classList.remove("minimized");
        } else {
            element.classList.add("minimized");
        }
    }

    render(){
        const { active_jobs } = this.props.invited_active_jobs_reducer;

        return(
            <React.Fragment>
                <div className="custom-job-heading">
                {active_jobs && active_jobs.length > 0 ?
                    <h3>Active Jobs</h3>
                : "" }
                </div>
                {active_jobs && active_jobs.map( (job, index) =>
                    <div key={index} className="jobs-holder">
                        <div className="heading-block">
                            <h3><a href={'./job/'+ job.id} >{job.title}</a></h3>
                            <ul>
                                <li>Category: {job.job_category}</li>
                                <li>Started on: <time>{job.starting_date}</time></li>
                                <li>Max. Budget: ${job.minimum_budget}</li>
                            </ul>
                        </div>
                        <div className="home-freelancer-listing">
                            {job.invited_freelancers_count > 0 ?
                                <h2>Hired AI Freelancers : {job.accept_freelancers_list.length}</h2>
                            : ""}                        
                            <ul>
                                {job.accept_freelancers_list && job.accept_freelancers_list.map( (ifl, index) =>
                                    <li key={index}>
                                        <div className="home-freelancer-holder">
                                            <div className="left-content">
                                                <div className="image-holder">
                                                    {!!ifl.user_avatar_url ?
                                                        <React.Fragment>
                                                            <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><img src={ifl.user_avatar_url} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
                                                        </React.Fragment> 
                                                        :
                                                        <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
                                                    }
                                                </div>
                                                <Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >
                                                      Message
                                                </Button>
                                                {job.accepted_freelancer_ids.includes(ifl.user_id) ?
                                                    "" :
                                                    <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                                                }
                                                <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
                                            </div>
                                            <div className="right-content">
                                                <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}><h2>{ifl.user_full_name}</h2></a>
                                                <h3>{ifl.user_title}</h3>
                                                <div className="mobile-action-buttons">
                                                <ul>
                                                    <li><Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >Message</Button></li>
                                                    {job.accepted_freelancer_ids.includes(ifl.user_id) ?
                                                        "" :
                                                        <li><Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button></li>
                                                    }
                                                </ul>
                                                </div>
                                                 <ul>
                                                    <li>Proposed Timeline: {ifl.job_cover_letter.expected_timeline} weeks</li>
                                                    <li>Proposed Budget: ${ifl.job_cover_letter.expected_amount}</li>
                                                  </ul>
                                                  <p>{ifl.job_cover_letter.cover_letter}</p>
                                                    {ifl.user_badge_list && ifl.user_badge_list.length > 0 ?
                                                        <ul className="user-skills-list">
                                                            { ifl.user_badge_list && ifl.user_badge_list.map((val, index) => (
                                                                <li key={index} >
                                                                    <strong>{val.badge_title} <Tooltip className="help-link" title={val.badge_description}><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></strong>
                                                                    <span>Level: {val.badge_expert_level}</span>
                                                                      <div className="badge-image">
                                                                        <img src={val.badge_avatar_url} alt="Badge | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                                                                      </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    : ""
                                                    }
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
  return {
    auth: state.auth, 
    invited_active_jobs_reducer: state.invited_active_jobs_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    fetchAllActiveJobs: () => {
        dispatch(iajActions.fetch())
    },

    openChatroom: (data) => {
      return dispatch(chatroomActions.openUserChatroom(data));
    },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);

