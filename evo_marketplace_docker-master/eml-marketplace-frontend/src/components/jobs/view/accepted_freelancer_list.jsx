import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as acfActions from './../../../actions/accepted_freelancers';

class AcceptedFreelancerList extends Component {
  componentWillMount() {
    this.props.fetchAcceptedFreelancers(this.props.job_id);
  }
  render() {
    const { accepted_freelancers } = this.props.accepted_freelancers_reducer;
    return (
      <div className='page-content margin-top-10px'>
        <div className='page-header'>
          <h2>Accepted Freelancers</h2>
        </div>
        <div className='ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left'>
          <div className='ant-table-body'>
            <table>
              <thead className='ant-table-thead'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className='ant-table-tbody'>
                { accepted_freelancers.map((freelancer, index) => (
                  <tr key={index}>
                    <td>{freelancer.user_full_name}</td>
                    <td>{freelancer.user_email}</td>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    accepted_freelancers_reducer: state.accepted_freelancers_reducer,
    job_id: ownProps.job_id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAcceptedFreelancers: (id) => (dispatch(acfActions.fetch(id))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedFreelancerList);
