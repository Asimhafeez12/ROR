import React, { Component } from 'react';
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
			<footer className="static-footer">
				<div className="static-footer-holder">
					<div className="footer-logo-holder">
						<div className="logo">
							<a href="/"><img src={footerLogo} alt="footer Logo" /></a>
						</div>
					</div>
					<div className="footer-columns-holder">
						<div className="footer-columns">
							<h5 className="nav-heading">Navigate</h5>
							<ul>
								<li><a href="/">Home</a></li>
								<li><a href="/how-it-work">How it Works</a></li>
								<li><a href="/evaluation">Our Evaluation Process</a></li>
								<li><a href="/blog">Blog</a></li>
								<li><a href="/job_category">Hire Now</a></li>
							</ul>
						</div>
						<div className="footer-columns">
							<h5 className="company-heading">Company</h5>
							<ul>
								<li><a href="">About Us</a></li>
								<li><a href="">Contact Us</a></li>
								<li><a href="">Privacy Policy</a></li>
								<li><a href="">Terms of Service</a></li>
								<li><a href="">FAQ</a></li>
							</ul>
						</div>
						<div className="footer-columns">
							<h5 className="connect-heading">Connect</h5>
							<ul>
								<li><a href=""><div className="social-icon-holder facebook-icon"><img src={facebookIcon} alt="Facebook Icon" /></div><span className="social-text">Facebook</span></a></li>
								<li><a href=""><div className="social-icon-holder"><img src={instagramIcon} alt="Instagram Icon" /></div><span className="social-text">Instagram</span></a></li>
								<li><a href=""><div className="social-icon-holder"><img src={twitterIcon} alt="Twitter Icon" /></div><span className="social-text">Twitter</span></a></li>
								<li><a href=""><div className="social-icon-holder"><img src={linkedinIcon} alt="Linkedin Icon" /></div><span className="social-text">Linkedin</span></a></li>
							</ul>
						</div>					
					</div>
				</div>
			</footer>
		);
	}
}

export default StaticFooter;