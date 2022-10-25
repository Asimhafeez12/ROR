import React, { Component } from 'react';
import StaticFooter from './../layout/footer';

class Sitemap extends Component{
	render(){
		return(
			<div className="custom-static-page">
				<div className="custom-static-header">
					<div className="holder">
						<h1>Sitemap</h1>
					</div>
				</div>
				<div className="custom-static-body">
					<div className="holder">
						<div className="sitemap-row">
							<h5 className="nav-heading">Navigate</h5>
							<ul>
								<li><a href="/">Home</a></li>
								<li><a href="/how-it-work">How it Works</a></li>
								<li><a href="/evaluation">Our Evaluation Process</a></li>
								<li><a href="/job_creation">Hire Now</a></li>
								<li><a href="/for-freelancers">Join as AI freelancer</a></li>
								<li><a href="https://wurker.crisp.help/en/" rel="noopener noreferrer" target="_blank">Help (FAQs)</a></li>
							</ul>
						</div>
						<div className="sitemap-row">
							<h5 className="company-heading">Company</h5>
							<ul>
								<li><a href="/about-us">About</a></li>
								<li><a href="http://blog.wurker.ai/">Blog</a></li>
								<li><a href="http://newsroom.wurker.ai/">Newsroom</a></li>
							</ul>
						</div>
						<div className="sitemap-row">
							<h5 className="connect-heading">Resources</h5>
							<ul>
								<li><a href="/contact-us">Contact Us</a></li>
								<li><a href="/privacy_policy">Privacy Policy</a></li>
								<li><a href="/terms_of_service">Terms of Service</a></li>
								<li><a href="/code_of_conduct">Code of Conduct</a></li>
								<li><a href="/">Sitemap</a></li>
							</ul>
						</div>
					</div>
				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default Sitemap;