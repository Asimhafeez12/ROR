import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import * as vActions from './../../../../actions/jobs/invited_freelancers';
import * as chatroomActions from './../../../../actions/user_chatrooms';
import * as afActions from './../../../../actions/accepted_freelancers';
import * as jActions from './../../../../actions/jobs/view';
import FreelancerImage from '../../../../images/freelancer_default.png';
import badge1 from '../../../../images/badge-4 chatbot.png';
import badge2 from '../../../../images/badge-5 computer vision.png';
import badge3 from '../../../../images/badge-6 cnn.png';

class InviteFreelancerList extends Component {
  state = {
    invited_lists: {}
  }

  componentWillMount() {
    this.props.fetchInvitedFreelancers(this.props.job.id);
  }

  toggleInvitedList(obj, e) {
    let { invited_lists } = this.state;
    invited_lists[obj.user_id] = !invited_lists[obj.user_id];
    this.setState({
      invited_lists: invited_lists,
    });
  }
    acceptFreelancer(obj_user, obj_job, e) {
      const value = []; value.push(obj_user.user_id);
      const values = value.map((val) => ( {user_id: val}));
        this.props.acceptFreelancers(obj_job.id, {job: {state_event: "active", accept_freelancers_attributes: values}}).then((res) => {
          this.props.fetchViewJob(obj_job.id);
          window.location = '/job/' + obj_job.id;
        });
    }
  render() {
    const { invited_freelancers } = this.props.invited_freelancers_reducer;
    const { job } = this.props;
    return (
          <div className="home-freelancer-listing">
            <ul>
              {invited_freelancers && invited_freelancers.map( (ifl, index) =>
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
                        <Button type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id }) ) } >
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
                          <Button type="primary" size="large" onClick={ () => ( this.props.openChatroom({chatroom_id: ifl.current_chatroom_id, user_id: ifl.user_id, full_name: ifl.user_full_name, job_id: job.id }) ) } >
                              Message
                          </Button>
                        {job.state === "open" ?    
                          <Button className="hire-btn" size="large" href={'/hire_freelancer/' + job.id + '/user/' + ifl.user_id} >Hire</Button>
                        : "" }
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
