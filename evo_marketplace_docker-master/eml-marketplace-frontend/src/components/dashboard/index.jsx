import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (<div>h1</div>);
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(Dashboard);
