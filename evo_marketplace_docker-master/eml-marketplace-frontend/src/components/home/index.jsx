import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClientDashboard from './../dashboard/client';
import FreelancerDashboard from './../dashboard/freelancer';


class Home extends Component{
	render(){
		const { currentUser } = this.props.auth;
		return(
			<div>
			 { this.props.auth.isAuthenticated && currentUser._r.includes("client") ? <ClientDashboard /> : "" }
			 { this.props.auth.isAuthenticated && currentUser._r.includes("freelancer") ? <FreelancerDashboard /> : "" }
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    my_jobs_reducer: state.my_jobs_reducer,
    auth: state.auth
  };
}


const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/sign_up')
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);



