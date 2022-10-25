import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mActions from './../../../actions/jobs/my';
import * as chatroomActions from './../../../actions/user_chatrooms';
import { Button, Icon, Tooltip } from 'antd';
import badge1 from '../../../images/badge-4 chatbot.png';
import badge2 from '../../../images/badge-5 computer vision.png';
import badge3 from '../../../images/badge-6 cnn.png';
import FreelancerImage from '../../../images/freelancer_default.png';


class OpennedJobs extends Component{

    componentWillMount() {
        this.props.fetchMyJobs();
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
        const { jobs } = this.props.my_jobs_reducer;

        return(
            <React.Fragment>
                {jobs && jobs.map( (job, index) =>
                    <div key={index} className="jobs-holder">
                        {job.job_cover_letters}
                        <div className="heading-block">
                            <a href={'./job/'+ job.id} >
                                <h3>{job.title}</h3>
                            </a>
                            <ul>
                                <li>Category: {job.job_category}</li>
                                <li>Posted on: <time>{job.created_at_format}</time></li>
                                <li>Max. Budget: ${job.minimum_budget}</li>
                            </ul>
                            <a href={'./edit_job/'+ job.id}><Button size="large" className="edit-job-btn">Edit Job</Button></a>
                        </div>
                        {job.job_cover_letter_ids && job.job_cover_letter_ids.length > 0 ?
                            <div className="home-freelancer-listing">
                                    <h2>Recommended AI Engineers : {job.job_cover_letter_ids.length}</h2>
                                <ul>
                                    {job.invited_freelancers_list && job.invited_freelancers_list.map( (ifl, index) =>
                                        <li key={index}>
                                            {ifl.job_cover_letter !== false ?
                                                <div className="home-freelancer-holder">
                                                    <div className="left-content">
                                                        <div className="image-holder">
                                                            {!!ifl.user_avatar_url ?
                                                                "" :
                                                                <a href=""><img src={FreelancerImage} alt="User img" /></a>
                                                            }
                                                        </div>
                                                        <Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title }))} onMouseDown={this.destoryWindow.bind()} >
                                                              Message
                                                        </Button>
                                                        <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                                                        <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
                                                    </div>
                                                    <div className="right-content">
                                                        <h2>{ifl.user_full_name}</h2>
                                                        <h3>{ifl.user_title}</h3>
                                                        <div className="mobile-action-buttons">
                                                        <Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title }))} onMouseDown={this.destoryWindow.bind()} >
                                                              Message
                                                        </Button>
                                                            <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                                                            <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
                                                        </div>
                                                         <ul>
                                                             {ifl.job_cover_letter !== false ?
                                                                <li>Proposed Timeline: {ifl.job_cover_letter.expected_timeline} weeks</li>
                                                            : "" }
                                                            {ifl.freelancer_cover_letter_expected_amount ?
                                                                <li>Proposed Budget: ${ifl.job_cover_letter.expected_amount}</li>
                                                            : "" }
                                                            <li>Total Earned: $6000</li>
                                                          </ul>
                                                          <p>{ifl.job_cover_letter.cover_letter}</p>
                                                        {ifl.user_expertise_list && ifl.user_expertise_list.length > 0 ?
                                                            <ul className="user-skills-list">
                                                                { ifl.user_skill_list && ifl.user_skill_list.map((val, index) => {
                                                                    let html = []
                                                                    ifl.user_expertise_list[index] && ifl.user_expertise_list[index] === 'Beginner' ? 
                                                                    html.push(<li className="beginner" key={index} >
                                                                        <strong>{val} Junior <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></strong>
                                                                        <span>Level: {ifl.user_expertise_list[index]}</span>
                                                                        <img className="badge-image" src={badge2} alt="Badge img" />
                                                                    </li>)
                                                                    : "" 
                                                                    ifl.user_expertise_list[index] && ifl.user_expertise_list[index] === 'Expert' ? 
                                                                    html.push(<li className="expert" key={index} >
                                                                        <strong>{val} Master <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></strong>
                                                                        <span>Level: {ifl.user_expertise_list[index]}</span>
                                                                        <img className="badge-image" src={badge1} alt="Badge img" />
                                                                    </li>)
                                                                    : "" 
                                                                    ifl.user_expertise_list[index] && ifl.user_expertise_list[index] === 'Intermediate' ? 
                                                                    html.push(<li className="intermediate" key={index}>
                                                                        <strong>{val} Pro <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip></strong>
                                                                        <span>Level: {ifl.user_expertise_list[index]}</span>
                                                                        <img className="badge-image" src={badge3} alt="Badge img" />
                                                                    </li>)
                                                                    : "" 
                                                                    return html;
                                                                }
                                                            )}
                                                            </ul>
                                                        : <ul className="user-skills-list"></ul>
                                                        }
                                                    </div>
                                                </div>
                                            : "" }
                                        </li>
                                    )}
                                </ul>
                            </div>
                        :
                        <div className="pending-approval-holder">
                            <h4>Pending approval and recommendations</h4> 
                        </div>
                        }
                    </div>
                )}
            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
  return {
    auth: state.auth, 
    my_jobs_reducer: state.my_jobs_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    fetchMyJobs: () => {
      dispatch(mActions.fetchMyJobs())
    },

    openChatroom: (data) => {
      return dispatch(chatroomActions.openUserChatroom(data));
    },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpennedJobs);

