import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Tooltip } from 'antd';
import * as ueActions from './../../actions/users/user_expertise';
import * as usActions from './../../actions/users/user_skills';

import badge1 from '../../images/badge-4 chatbot.png';
import badge2 from '../../images/badge-5 computer vision.png';
import badge3 from '../../images/badge-6 cnn.png';



class UserExpertiseWebView extends Component {

 componentWillMount() {
   this.props.fetchUserSkills(this.props.user.id);
   this.props.fetchUserExpertise(this.props.user.id);
 }


 render() {
   const { user_expertise } = this.props.user_expertise_reducer;
   const { user_skills } = this.props.user_skills_reducer;
   return (
      <React.Fragment>
            {user_expertise && user_expertise.length > 0 ?
            <h2>
              <span>Badges</span>
              <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip>
            </h2>
            : "" }
            {user_expertise && user_expertise.length > 0 ?
              <ul className="user-badges-list">
                { user_skills && user_skills.map((val, index) => (
                  <div key={index}>
                    {user_expertise[index] && user_expertise[index] === 'Beginner' ? 
                    <li className="beginner">
                      <img className="badge-image" src={badge2} alt="Badge img" />
                      <div className="badge-content">
                        <strong>{val} Junior <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'12px', fontWeight:'400'}} /></Tooltip></strong>
                        <span>Level: {user_expertise[index]}</span>
                      </div>  
                    </li>
                    : ""} 
                    {user_expertise[index] && user_expertise[index] === 'Expert' ? 
                    <li className="expert">
                      <img className="badge-image" src={badge1} alt="Badge img" />
                      <div className="badge-content">
                        <strong>{val} Master <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'12px', fontWeight:'400'}} /></Tooltip></strong>
                        <span>Level: {user_expertise[index]}</span>
                      </div>  
                    </li>
                    : ""} 
                    {user_expertise[index] && user_expertise[index] === 'Intermediate' ? 
                    <li className="intermediate">
                      <img className="badge-image" src={badge3} alt="Badge img" />
                      <div className="badge-content">
                        <strong>{val} Pro <Tooltip className="help-link" title="prompt text"><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'12px', fontWeight:'400'}} /></Tooltip></strong>
                        <span>Level: {user_expertise[index]}</span>
                      </div>  
                    </li>
                    : ""} 
                  </div>
                  ))}
              </ul>
            : "" }
      </React.Fragment>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   user_skills_reducer: state.user_skills_reducer,
   user_expertise_reducer: state.user_expertise_reducer
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserSkills: (user_id) => {
     dispatch(usActions.fetch(user_id))
   },
   fetchUserExpertise: (user_id) => {
     dispatch(ueActions.fetch(user_id))
   },
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserExpertiseWebView);