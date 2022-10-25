import React, { Component } from 'react';
import { Button } from 'antd';
import squareImage from './../../../images/icons/icon10.png';
import circleMixImage from './../../../images/icons/icon12.png';
import rocketImage from './../../../images/icons/rocket-icon.png';


class HireNowBlock extends Component{
	render(){
		return(
			<div className="hire-now-block">
				<div className="hire-now-holder">
					<h4>What are you waiting for?</h4>
					<p>Post now and get a curated list of most suitable AI Freelancers for your amazing projects.</p>
					<Button className="hirenow-btn" size="large" href="/job_creation">Hire Now</Button>
				</div>
				<div className="square-image offset-left-1 offset-bottom-5">
					<img src={squareImage} alt="Extra | Wurker.ai - Connecting Top AI talent with Cool Companies" />
				</div>
				<div className="circle-image offset-right-1 offset-top-4">
					<img src={circleMixImage} alt="Extra | Wurker.ai - Connecting Top AI talent with Cool Companies" />
				</div>
				<div className="rocket-image">
					<img src={rocketImage} alt="Extra | Wurker.ai - Connecting Top AI talent with Cool Companies" />
				</div>				
			</div>
		);
	}
}

export default HireNowBlock;