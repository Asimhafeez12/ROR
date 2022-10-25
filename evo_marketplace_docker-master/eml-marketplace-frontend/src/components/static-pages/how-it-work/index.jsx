import React, { Component } from 'react';
import { Button } from 'antd';
import HireNowBlock from './../layout/hire-now-block';
import StaticFooter from './../layout/footer';
import section2Image from './../../../images/section2-image.png';
import section3Image from './../../../images/section3-image.png';
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
						<p>Top Data Scientists & AI Freelancers</p>
						<span className="square-icon deg45 x3 pink offset-left-3 offset-top-5"></span>
						<span className="triangle-icon top x2 offset-right-5 offset-top-1"></span>
						<span className="circle-icon right x2 blue offset-left-5 offset-bottom-4"></span>
						<span className="square-icon bottom x4 orange offset-right-3 offset-bottom-4"></span>
					</section>

					<section className="section2">
						<div className="holder">
							<div className="image-holder">
								<img src={section2Image} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div className="content">
								<span className="step-no">Step # 1</span>
								<h2>Tell Us Your Requirements</h2>
								<p>Fill out an application form and list all the details of your project.</p>
								<Button className="custom-hire-button" type="primary" href="/job_creation">Start Hiring</Button>
							</div>
							<div className="mobile-image-holder">
								<img src={section2Image} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
						</div>
					</section>

					<section className="section3">
						<div className="holder">
							<div className="image-holder">
								<img src={section3Image} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div className="content">
								<span className="step-no">Step # 2</span>
								<h2>Get a Curated List of Freelancers</h2>
								<p>Our AI experts will go through your requirements and "select" the 3 most suitable freelancers.</p>
							</div>
							<div className="mobile-image-holder">
								<img src={section2Image} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
						</div>
						<div className="dots-icon offset-left-4 offset-top-2">
							<img src={dotsImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
					</section>

					<section className="section4">
						<div className="holder">
							<div className="content">
								<span className="step-no">Step # 3</span>
								<h2>Interview and Start</h2>
								<p>Recommended freelancers will submit their proposals. Interview and start working with the one you want. </p>
							</div>
							<div className="image-holder">
								<img src={section4Image} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
						</div>
						<span className="square-icon deg45 x3 blue offset-left-5 offset-top-1"></span>
						<span className="triangle-icon top x2 offset-left-2 offset-top-5"></span>
						<div className="circle-image offset-right-0 offset-top-0">
							<img src={circleImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
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



