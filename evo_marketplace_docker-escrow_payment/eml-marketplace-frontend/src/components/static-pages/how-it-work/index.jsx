import React, { Component } from 'react';
import { Button } from 'antd';
import HireNowBlock from './../layout/hire-now-block';
import StaticFooter from './../layout/footer';
import section2Image from './../../../images/section2-image.png';
import section4Image from './../../../images/section4-image.png';
import dotsImage from './../../../images/icons/icon6.png';
import circleImage from './../../../images/icons/icon8.png';

class howItWork extends Component{
	render(){
		return(
			<div className="how-it-work-holder">
				<div className="how-it-work-body">
					<section className="section1">
						<h1>Start Hiring</h1>
						<p>Top Data Scientist & AI Freelancers</p>
						<span className="square-icon deg45 x3 pink offset-left-3 offset-top-5"></span>
						<span className="triangle-icon top x2 offset-right-5 offset-top-1"></span>
						<span className="circle-icon right x2 blue offset-left-5 offset-bottom-4"></span>
						<span className="square-icon bottom x4 orange offset-right-3 offset-bottom-4"></span>
					</section>

					<section className="section2">
						<div className="holder">
							<div className="image-holder">
								<img src={section2Image} alt="Home Page" />
							</div>
							<div className="content">
								<span className="step-no">Step # 01</span>
								<h2>Tell us About your Requirement</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								<Button className="custom-hire-button" type="primary" href="/job_category">Start Hiring</Button>
							</div>
							<div className="mobile-image-holder">
								<img src={section2Image} alt="Home Page" />
							</div>
						</div>
					</section>

					<section className="section3">
						<div className="holder">
							<div className="image-holder">
								<img src={section2Image} alt="Home Page" />
							</div>
							<div className="content">
								<span className="step-no">Step # 02</span>
								<h2>Get a short list of Recommended Freelancers</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
							<div className="mobile-image-holder">
								<img src={section2Image} alt="Home Page" />
							</div>
						</div>
						<div className="dots-icon offset-left-4 offset-top-2">
							<img src={dotsImage} alt="Home Page" />
						</div>
					</section>

					<section className="section4">
						<div className="holder">
							<div className="content">
								<span className="step-no">Step # 03</span>
								<h2>Interview and start your Risk-free trial</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
							<div className="image-holder">
								<img src={section4Image} alt="Home Page" />
							</div>
						</div>
						<span className="square-icon deg45 x3 blue offset-left-5 offset-top-1"></span>
						<span className="triangle-icon top x2 offset-left-2 offset-top-5"></span>
						<div className="circle-image offset-right-0 offset-top-0">
							<img src={circleImage} alt="Home Page" />
						</div>
						<span className="square-icon deg45 x2 orange offset-left-2 offset-bottom-3"></span>
						<span className="circle-icon top x2 light-green offset-right-2 offset-bottom-5"></span>
					</section>

				</div>

				<HireNowBlock />
				<StaticFooter />
			</div>
		);
	}
}

export default howItWork;



