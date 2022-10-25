import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import homePageImage from './../../images/Home-page.png';

class HomePage extends Component{

	render(){
		document.body.classList.add('static-home-page');
		
		return(
			<React.Fragment>
				{ this.props.auth.isAuthenticated ?
				"" :
					<div className="static-home-holder">
						<div className="static-home-content">
							<h1>We help Data Science & AI Freelancers and Companies <br/>find each other to <br/>build the future of tech</h1>
							<p>Finding the best tech talent to fill your vacant tech jobs</p>
							<Button className="filled-btn">Work with Freelancers</Button>
						</div>
						<span className="square-icon deg45 x3 blue offset-left-3 offset-top-4"></span>
						<span className="plus-icon x3 orange offset-right-3 offset-top-3"></span>
						<span className="triangle-icon bottom x2 offset-left-5 offset-top-5"></span>
						<span className="square-icon deg45 x3 red offset-right-5 offset-top-5"></span>
						<div className="home-image-holder">
							<img src={homePageImage} alt="Home Page img" />
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(HomePage);
