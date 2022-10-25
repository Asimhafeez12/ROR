import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rate } from 'antd';
import * as fcjActions from './../../actions/freelancer_completed_jobs';
import ClientImage from '../../images/client_default.png';
import moment from 'moment';


class UserCompletedJobs extends Component {

  componentWillMount() {
      this.props.fetchAllJobs(window.location.href.split('/')[4]);
  }

 render() {
   const { completed_jobs } = this.props.freelancer_completed_jobs_reducer;
   return (
      <React.Fragment>
              { completed_jobs && completed_jobs.map((val, index) => (
              <div className="profile-section4-holder" key={index}>
                <h3><strong>{val.title}</strong><span className="price">${(val.amount_paid_for_completed_milestones)/100}</span></h3>
                {val.closing_date === null ?
                  <h4>In progress</h4>
                  :
                  <h4>Completion Date : {moment(val.closing_date).format('MM/DD/YYYY')}</h4>
                }
                <div className="profile-detail-block">
                  {!!val.all_job_ratings_for_freelancer ?
                    <ul>
                      <li>
                        <span className="span-heading">Communication:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].communication} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].communication && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].communication})</span>}
                        </div>
                      </li>
                      <li>
                        <span className="span-heading">Accuracy:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].accuracy} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].accuracy && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].accuracy})</span>}
                        </div>
                      </li>
                      <li>
                        <span className="span-heading">Quality of work:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].quality} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].quality && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].quality})</span>}
                        </div>
                      </li>
                      <li>
                        <span className="span-heading">Value:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].value} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].value && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].value})</span>}
                        </div>
                      </li>
                      <li>
                        <span className="span-heading">Deadlines:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].deadline} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].deadline && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].deadline})</span>}
                        </div>
                      </li>
                      <li>
                        <span className="span-heading">Availablity:</span>
                        <div className="rating-block">
                          <Rate disabled value={val.all_job_ratings_for_freelancer[0].availability} style={{ fontSize:'16px'}} />
                          {val.all_job_ratings_for_freelancer[0].availability && <span className="ant-rate-text">({val.all_job_ratings_for_freelancer[0].availability})</span>}
                        </div>
                      </li>
                    </ul>
                  : ""
                  }
                  <p>{val.description}</p>
                  <div className="user-profile">
                    <div className="user-profile-image">
                      {!!val.job_client_avatar ?
                        <React.Fragment>
                          <img src={val.job_client_avatar} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
                        </React.Fragment>
                        : <img src={ClientImage} alt="Client | Wurker.ai - Connecting Top AI talent with Cool Companies" />
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
  freelancer_completed_jobs_reducer: state.freelancer_completed_jobs_reducer,
 };
}

function mapDispatchToProps(dispatch) {
 return {
    fetchAllJobs: (user_id) => (dispatch(fcjActions.fetch(user_id))),
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCompletedJobs);