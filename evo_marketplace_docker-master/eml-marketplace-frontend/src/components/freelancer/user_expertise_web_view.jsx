import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Tooltip } from 'antd';
import * as ubActions from './../../actions/users/user_badges';



class UserExpertiseWebView extends Component {

 componentWillMount() {
  this.props.fetchUserBadges(this.props.user.id);
 }


 render() {
   const { user_badges } = this.props.user_badges_reducer;
   return (
      <React.Fragment>
            {user_badges && user_badges.length > 0 ?
            <h2>
              <span>Badges</span>
              <Tooltip className="help-link" title="Badges are used to signify freelancers with special skill sets."><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'14px', fontWeight:'400'}} /></Tooltip>
            </h2>
            : "" }
              <ul className="user-badges-list">
                { user_badges && user_badges.map((val, index) => (
                  <div key={index}>
                    <li>
                      <div className="badge-image">
                        <img src={val.avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                      </div>
                      <div className="badge-content">
                        <strong>{val.title} <Tooltip className="help-link" title={val.description}><Icon type="question-circle-o" style={{ color:'#bfbfbf', fontSize:'12px', fontWeight:'400'}} /></Tooltip></strong>
                        <span>Level: {val.expert_level}</span>
                      </div>  
                    </li>
                  </div>
                  ))}
              </ul>
      </React.Fragment>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
  user_badges_reducer: state.user_badges_reducer,
 };
}

function mapDispatchToProps(dispatch) {
 return {
   fetchUserBadges: (user_id) => {
     dispatch(ubActions.fetch(user_id))
   },
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserExpertiseWebView);