import React, { Component } from 'react';
import { connect } from 'react-redux';
import footerLogo from './../../../images/logo-white.svg';
import facebookIcon from './../../../images/social-icons/facebook.svg';
import linkedinIcon from './../../../images/social-icons/linkedin.svg';
import twitterIcon from './../../../images/social-icons/twitter.svg';
import instagramIcon from './../../../images/social-icons/instagram.svg';


class StaticFooter extends Component{

	render(){
		document.body.classList.remove('static-home-page');
		document.body.classList.add('have-static-footer');
		return(
			<React.Fragment>
			{ this.props.auth.isAuthenticated ? ""
				:
				<footer className="static-footer">
					<div className="static-footer-top">
						<div className="static-footer-holder">
							<div className="footer-columns-holder">
								<div className="footer-columns">
									<h5 className="nav-heading">Navigate</h5>
									<ul>
										<li><a href="/">Home</a></li>
										<li><a href="/how-it-work">How it Works</a></li>
										<li><a href="/evaluation">Our Evaluation Process</a></li>
										<li><a href="/job_creation">Hire Now</a></li>
										<li><a href="/for-freelancers">Join as AI Freelancer</a></li>
										<li><a href="https://wurker.crisp.help/en/" rel="noopener noreferrer" target="_blank">Help (FAQs)</a></li>
									</ul>
								</div>
								<div className="footer-columns">
									<h5 className="company-heading">Company</h5>
									<ul>
										<li><a href="/about-us">About</a></li>
										<li><a href="http://blog.wurker.ai/">Blog</a></li>
										<li><a href="http://newsroom.wurker.ai/">Newsroom</a></li>
									</ul>
								</div>
								<div className="footer-columns">
									<h5 className="resources-heading">Resources</h5>
									<ul>
										<li><a href="/contact-us">Contact Us</a></li>
										<li><a href="/privacy_policy">Privacy Policy</a></li>
										<li><a href="/terms_of_service">Terms of Services</a></li>
										<li><a href="/code_of_conduct">Code of Conduct</a></li>
										<li><a href="/sitemap">Sitemap</a></li>
									</ul>
								</div>
								<div className="footer-columns">
									<h5 className="connect-heading">Connect</h5>
									<ul>
										<li><a href="https://www.facebook.com/wurkerai"><div className="social-icon-holder facebook-icon"><img src={facebookIcon} alt="Facebook Icon" /></div><span className="social-text">Facebook</span></a></li>
										<li><a href="https://www.instagram.com/wurkerai/"><div className="social-icon-holder"><img src={instagramIcon} alt="Instagram Icon" /></div><span className="social-text">Instagram</span></a></li>
										<li><a href="https://twitter.com/Wurkerai"><div className="social-icon-holder"><img src={twitterIcon} alt="Twitter Icon" /></div><span className="social-text">Twitter</span></a></li>
										<li><a href="https://www.linkedin.com/company/wurkerai"><div className="social-icon-holder"><img src={linkedinIcon} alt="Linkedin Icon" /></div><span className="social-text">Linkedin</span></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="static-footer-bottom">
						<div className="static-footer-holder">
							<div className="footer-logo-holder">
								<span className="copy-right-text">&copy; 2019</span>
								<div className="logo">
									<a href="/"><img src={footerLogo} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></a>
								</div>
							</div>
						</div>
					</div>
					<div className="trustpilot-widget" data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="5c68e7de3b6333000168dc2b" data-style-height="24px" data-style-width="100%" data-theme="dark" data-stars="1,2,3,4,5">
						<a href="https://www.trustpilot.com/review/wurker.ai" rel="noopener noreferrer" target="_blank">Trustpilot</a>
					</div>

				</footer>
			}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth 
	};
}

export default connect(mapStateToProps)(StaticFooter);