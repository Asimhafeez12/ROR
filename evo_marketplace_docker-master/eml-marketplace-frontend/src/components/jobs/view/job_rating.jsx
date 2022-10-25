import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rate, Button } from 'antd';
import * as fjrActions from './../../../actions/freelancer_job_ratings';
import * as cjrActions from './../../../actions/client_job_ratings';
import Defender from './../../../helpers/defender';

class JobRating extends Component {
  state = {
    value: 0
  }

  handleChange = (value) => {
    this.setState({ value });
  }
  componentWillMount() {
      this.props.getFreelancerJobRating(this.props.job_id, this.props.job.accepted_freelancer_id);
      this.props.getClientJobRating(this.props.job_id, this.props.job.user_id);
  }
  render(){
    //const { job } = this.props;
    const {freelancer_job_rating } = this.props.freelancer_job_rating_reducer;
    const {client_job_rating } = this.props.client_job_rating_reducer;
    return (
      <React.Fragment>
        {Defender.currentUser()._r.includes("client") ?
          <div className="review-rating-holder">
            <div className="rating-given">
              <div className="given-top">
                <h2>Rating and Review given</h2>
                <ul>
                  <li>
                    <span className="title">Communication:</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.communication} />
                    {freelancer_job_rating.communication && <span className="ant-rate-text">({freelancer_job_rating.communication})</span>}
                  </li>
                  <li>
                    <span className="title">Accuracy:</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.accuracy} />
                    {freelancer_job_rating.accuracy && <span className="ant-rate-text">({freelancer_job_rating.accuracy})</span>}
                  </li>
                  <li>
                    <span className="title">Quality of work:</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.quality} />
                    {freelancer_job_rating.quality && <span className="ant-rate-text">({freelancer_job_rating.quality})</span>}
                  </li>
                  <li>
                    <span className="title">Value:</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.value} />
                    {freelancer_job_rating.value && <span className="ant-rate-text">({freelancer_job_rating.value})</span>}
                  </li>
                  <li>
                    <span className="title">Deadlines:</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.deadline} />
                    {freelancer_job_rating.deadline && <span className="ant-rate-text">({freelancer_job_rating.deadline})</span>}
                  </li>
                  <li>
                    <span className="title">Availability</span>
                    <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.availability} />
                    {freelancer_job_rating.availability && <span className="ant-rate-text">({freelancer_job_rating.availability})</span>}
                  </li>
                </ul>
              </div>
              <div className="given-middle">
                <h3>Overall Rating {freelancer_job_rating.rounded_overall_rating && <span className="ant-rate-text">({freelancer_job_rating.rounded_overall_rating})</span>}</h3>
                <Rate className="rating-block" style={{ fontSize:'22px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.rounded_overall_rating} />
              </div>
              <div className="given-bottom">
                <h3>Review</h3>
                <p>{freelancer_job_rating.review}</p>
              </div>
            </div>

            <div className="rating-received">
              <div className="received-top">
                <h2>Rating and Review Received <a>&nbsp;</a></h2>
              </div>
              <div className="received-middle">
                <h3>Rating {client_job_rating.overall_rating && <span className="ant-rate-text">({client_job_rating.overall_rating})</span>}</h3>
                <Rate className="rating-block" style={{ fontSize:'22px' }} disabled onChange={this.handleChange} value={client_job_rating.overall_rating} />
              </div>
              <div className="received-bottom">
                <h3>Review</h3>
                <p>{client_job_rating.review}</p>
              </div>
            </div>
          </div>
        :
          <div className="review-rating-holder">
            {client_job_rating.review ?
              <div className="rating-received">
                <div className="received-top">
                  <h2>Rating and Review Given <a href="">&nbsp;</a></h2>
                </div>
                <div className="received-middle">
                  <h3>Rating {client_job_rating.overall_rating && <span className="ant-rate-text">({client_job_rating.overall_rating})</span>}</h3>
                  <Rate className="rating-block" style={{ fontSize:'22px' }} disabled onChange={this.handleChange} value={client_job_rating.overall_rating} />
                </div>
                <div className="received-bottom">
                  <h3>Review</h3>
                  <p>{client_job_rating.review}</p>
                </div>
              </div>
            : "" }
            {client_job_rating.review ?
              <div className="rating-given">
                <div className="given-top">
                  <h2>Rating and Review Received</h2>
                  <ul>
                    <li>
                      <span className="title">Communication:</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.communication} />
                      {freelancer_job_rating.communication && <span className="ant-rate-text">({freelancer_job_rating.communication})</span>}
                    </li>
                    <li>
                      <span className="title">Accuracy:</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.accuracy} />
                      {freelancer_job_rating.accuracy && <span className="ant-rate-text">({freelancer_job_rating.accuracy})</span>}
                    </li>
                    <li>
                      <span className="title">Quality of work:</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.quality} />
                      {freelancer_job_rating.quality && <span className="ant-rate-text">({freelancer_job_rating.quality})</span>}
                    </li>
                    <li>
                      <span className="title">Value:</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.value} />
                      {freelancer_job_rating.value && <span className="ant-rate-text">({freelancer_job_rating.value})</span>}
                    </li>
                    <li>
                      <span className="title">Deadlines:</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.deadline} />
                      {freelancer_job_rating.deadline && <span className="ant-rate-text">({freelancer_job_rating.deadline})</span>}
                    </li>
                    <li>
                      <span className="title">Availability</span>
                      <Rate className="rating-block" style={{ fontSize:'16px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.availability} />
                      {freelancer_job_rating.availability && <span className="ant-rate-text">({freelancer_job_rating.availability})</span>}
                    </li>
                  </ul>
                </div>
                <div className="given-middle">
                  <h3>Overall Rating {freelancer_job_rating.rounded_overall_rating && <span className="ant-rate-text">({freelancer_job_rating.rounded_overall_rating})</span>}</h3>
                  <Rate className="rating-block" style={{ fontSize:'22px' }} disabled onChange={this.handleChange} value={freelancer_job_rating.rounded_overall_rating} />
                </div>
                <div className="given-bottom">
                  <h3>Review</h3>
                  <p>{freelancer_job_rating.review}</p>
                </div>
              </div>
            : 
            <div>
              <h2>You will only be able to view your ratings once you have rated the client</h2>
              <Button href={"/add_review_rating/" + this.props.job_id} className="close-job-btn" type="primary" size="large">Rate Client</Button>
            </div> 
          }
          </div>
        }

      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    job_id: ownProps.job.id,
    job: ownProps.job,
    freelancer_id: ownProps.accepted_freelancer_id,
    freelancer_job_rating_reducer: state.freelancerjobRatingReducer,
    client_job_rating_reducer: state.clientjobRatingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFreelancerJobRating: (job_id, user_id) => (dispatch(fjrActions.fetch(job_id, user_id))),
    getClientJobRating: (job_id, user_id) => (dispatch(cjrActions.fetch(job_id, user_id))),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(JobRating);
