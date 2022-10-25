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
					<h4>Lorem ipsum dolor sit amet</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<Button size="large" htmlType="submit" href="/job_category">Hire Now</Button>
				</div>
				<div className="square-image offset-left-1 offset-bottom-5">
					<img src={squareImage} alt="Home Page img" />
				</div>
				<div className="circle-image offset-right-1 offset-top-4">
					<img src={circleMixImage} alt="Home Page img" />
				</div>
				<div className="rocket-image">
					<img src={rocketImage} alt="Home Page img" />
				</div>				
			</div>
		);
	}
}

export default HireNowBlock;