import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip, Rate } from 'antd';
import * as vActions from './../../../../actions/jobs/invited_freelancers';
import * as chatroomActions from './../../../../actions/user_chatrooms';
import * as afActions from './../../../../actions/accepted_freelancers';
import * as jActions from './../../../../actions/jobs/view';
import FreelancerImage from '../../../../images/freelancer_default.png';

class InviteFreelancerList extends Component {
  state = {
    invited_lists: {}
  }

  componentWillMount() {
    this.props.fetchInvitedFreelancers(this.props.job.id);
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

  toggleInvitedList(obj, e) {
    let { invited_lists } = this.state;
    invited_lists[obj.user_id] = !invited_lists[obj.user_id];
    this.setState({
      invited_lists: invited_lists,
    });
  }

  render() {
    const { invited_freelancers } = this.props.invited_freelancers_reducer;
    const { job } = this.props;
    return (
      <React.Fragment>
        {invited_freelancers && invited_freelancers.length > 0 ?
          <div className="home-freelancer-listing">
            <ul>
              {invited_freelancers && invited_freelancers.map( (ifl, index) =>
                <li key={index}>
                  {ifl.job_cover_letter !== false ?
                    <div className="home-freelancer-holder">
                      <div className="left-content">
                        <div className="image-holder">
                          {!!ifl.user_avatar_url ?
                              <React.Fragment>
                                <img src={ifl.user_avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                              </React.Fragment>
                              :
                              <a href=""><img src={FreelancerImage} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
                          }
                        </div>
                        <Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >
                          Message
                        </Button>
                        {job.state === "open" ?
                          <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                        : "" }
                        <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
                      </div>
                      <div className="right-content">
                        <h2>{ifl.user_full_name}</h2>
                        <h3>{ifl.user_title}</h3>
                        <div className="mobile-action-buttons">
                        <Button className="message-btn" type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id, job_title: job.title, job_state: job.state }))} onMouseDown={this.destoryWindow.bind()} >Message</Button>
                        {job.state === "open" ?    
                          <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                        : "" }
                        <a href={'/profile/'+ ifl.user_id + '/job/' + job.id}>View Profile</a>
                        </div>
                             <ul>
                                <li>Proposed Timeline: {ifl.job_cover_letter.expected_timeline} weeks</li>
                                <li>Proposed Budget: ${ifl.job_cover_letter.expected_amount}</li>
                                {ifl.average_job_rating_for_all_jobs !== null ?
                                  <li>Overall Rating: <Rate className="rating-block" style={{ fontSize:'16px' }} disabled value={ifl.average_job_rating_for_all_jobs} /></li>
                                : "" }
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
                  : "" }
                </li>
              )}
            </ul>
          </div>
        : "" }
      </React.Fragment>          

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    invited_freelancers_reducer: state.invited_freelancers_reducer,
    job: ownProps.job
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchViewJob: (id) => {
      return dispatch(jActions.fetchViewJob(id));
    },
    fetchInvitedFreelancers: (id) => {
      return dispatch(vActions.fetchFreelancers(id))
    },
    openChatroom: (data) => {
      return dispatch(chatroomActions.openUserChatroom(data));
    },
    acceptFreelancers: (job_id, data) => {
      return dispatch(afActions.acceptFreelancers(job_id, data))
      //return Promise.resolve();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteFreelancerList);
