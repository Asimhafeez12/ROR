import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fajActions from './../../actions/freelancer_active_jobs';
import ClientImage from '../../images/client_default.png';


class UserAcceptedJobs extends Component {


 componentWillMount() {
  this.props.fetchAllJobs();
 }


 render() {
   const { active_jobs } = this.props.freelancer_active_jobs_reducer;
   return (
      <React.Fragment>
              { active_jobs && active_jobs.map((val, index) => (
              <div className="profile-section4-holder" key={index}>
                <h3><strong>{val.title}</strong><span className="price">${val.minimum_budget}</span></h3>
                <h4>Completion Date : In Progress</h4>
                <div className="profile-detail-block">
                  <p>{val.description}</p>
                  <div className="user-profile">
                    <div className="user-profile-image">
                      {!!val.job_client_avatar ?
                        "" : <img src={ClientImage} alt="User img" />
                      }
                    </div>
                    <div className="user-profile-detail">
                      <strong>Client</strong>
                      <span>{val.user_full_name}</span>
                    </div>
                  </div>
                </div>
              </div>
              ))}
      </React.Fragment>
   );
 }
}

function mapStateToProps(state, ownProps) {
 return {
   freelancer_active_jobs_reducer: state.freelancer_active_jobs_reducer,
 };
}

function mapDispatchToProps(dispatch) {
 return {
    fetchAllJobs: () => (dispatch(fajActions.fetch())),
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAcceptedJobs);