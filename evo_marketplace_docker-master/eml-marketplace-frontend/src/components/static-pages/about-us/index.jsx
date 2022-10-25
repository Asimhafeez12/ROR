import React, { Component } from 'react';
import { Input, Button } from 'antd';
import StaticFooter from './../layout/footer';
import circleImage from './../../../images/icons/icon12.png';
import customIcon1 from './../../../images/icons/customicon1.png';
import customIcon2 from './../../../images/icons/customicon2.png';
import customIcon3 from './../../../images/icons/customicon3.png';
import customIcon4 from './../../../images/icons/customicon4.png';
import customIcon5 from './../../../images/icons/customicon5.png';
import customBanner from './../../../images/custombanner.png';
import headquarteredImage from './../../../images/custombanner2.png';
import chartImage from './../../../images/chartimage.png';


class aboutUs extends Component{
	render(){
		document.body.classList.add('about_us_page');
		return(
			<div className="about-us-holder">
				<section className="about-us-top">
					<div className="holder">
						<h1>Our mission is to increase the access to AI services</h1>
						<p>Wurker.ai is technology company that builds AI services and infrastructure for the internet. Businesses of every size - from new startups to public companies use our platform to build AI into their businesses.</p>
					</div>
					<span className="square-icon deg45 x3 light-green offset-left-3 offset-top-4"></span>
					<span className="circle-icon x3 red offset-right-3 offset-top-3"></span>
					<span className="triangle-icon top x2 offset-left-5 offset-bottom-5"></span>
					<span className="square-icon deg45 x2 orange offset-right-5 offset-bottom-5"></span>
				</section>
				<section className="chart-section">
					<div className="holder">
						<div className="chart-section-content">
							<h2>The Potential of the AI Economy</h2>
							<p>AI has the potential to deliver additional global economic activity of around $13 trillion by 2030, or about 16 percent higher cumulative GDP compared with today. This amounts to 1.2 percent additional GDP growth per year.</p>
							<p>Despite the growth and advancement of AI, only a "small percentage" of businesses leverage the benefits of AI technologies.</p>
							<p>Technological complexity, and a lack of engineers are constaining the impact of AI on the growth of businesses and the economy.</p>
							<p>Getting access to top AI freelancers and services helps more businesses gain efficienies, expedite growth and increase their output.</p>
							<p className="opacity-text">Source: Mckinsey Report, Notes from the AI frontier: Modeling the impact of AI on the world economy</p>
						</div>
						<div className="chart-section-chart">
							<img src={chartImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
					</div>
					<div className="circle-image">
						<img src={circleImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
					</div>
				</section>
				<section className="freelancer-markerplace-section">
					<div className="holder">
						<h2>AI Freelancer Marketplace</h2>
						<p>Wurker.ai gives businesses the access to AI Talent to build better products.</p>
						<ul>
							<li>
								<div className="image-holder">
									<img src={customIcon1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="freelancer-markerplace-text">Top AI Talent</span>
							</li>
							<li>
								<div className="image-holder">
									<img src={customIcon2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="freelancer-markerplace-text">Messaging</span>
							</li>
							<li>
								<div className="image-holder">
									<img src={customIcon3} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="freelancer-markerplace-text">Review System</span>
							</li>
							<li>
								<div className="image-holder">
									<img src={customIcon4} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="freelancer-markerplace-text">Online payments via Escrow.com</span>
							</li>
							<li>
								<div className="image-holder">
									<img src={customIcon5} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="freelancer-markerplace-text">Milestones</span>
							</li>
						</ul>
					</div>
				</section>
				<section className="ai-complexity-section">
					<div className="holder">
						<h2>Remove AI Complexity</h2>
						<p>We work with startups, medium-sized companies, unicorns and fortune 1000 companies, helping companies leverage the power of AI.</p>
						<div className="image-banner">
							<img src={customBanner} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
					</div>
				</section>
				<section className="headquarter-section">
					<div className="holder">
						<p>Wurker.ai is headquartered in Washington, DC area with offices in <br />Jakarta, Indonesia and Lahore, Pakistan.</p>
					</div>
					<div className="image-banner">
						<img src={headquarteredImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
					</div>
				</section>
				<section className="latest-section">
					<div className="holder">
						<label>Get the latest from Wurker.ai</label>
						<Input placeholder="Enter email address" size="large" />
						<Button className="contact-us-btn" htmlType="submit" type="primary">Submit</Button>
					</div>
				</section>
				<StaticFooter />
			</div>
		);
	}
}

export default aboutUs;

