import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientJobs from './client';
import FreelancerJobs from './freelancer';
import Defender from './../../../helpers/defender';
class MyJobs extends Component {
  render() {
    return (
      <div>
        { Defender.currentUser()._r.includes("client") ? <ClientJobs /> : "" }
        { Defender.currentUser()._r.includes("freelancer")? <FreelancerJobs /> : "" }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(MyJobs);
