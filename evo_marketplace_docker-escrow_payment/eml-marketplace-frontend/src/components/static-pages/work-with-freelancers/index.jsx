import React, { Component } from 'react';
import { Button } from 'antd';
import StaticFooter from './../layout/footer';
import amazonLogo from './../../../images/company-logos/amazon.svg';
import icon1 from './../../../images/icons/icon9.png';
import icon2 from './../../../images/icons/icon11.png';

class workWithFreelancer extends Component{
	render(){
		return(
			<div className="work-with-freelancers-holder">
				<div className="work-with-freelancers-body">
					<section className="section1">
						<h1>Team up with Data Science <br />& AI Freelancers</h1>
						<p>Need AI engineers to help you build an intelligent system? Yes! you do...<br />Evolve AI Marketplace helps connect ideal AI Freelancers with the <br />clients to complete their ambitious projects.</p>
						<span className="circle-icon x3 pink offset-left-3 offset-top-5"></span>
						<span className="square-icon deg45 x3 light-green offset-right-3 offset-top-5"></span>
						<span className="triangle-icon top x2 offset-left-5 offset-bottom-5"></span>
						<span className="square-icon deg45 x3 orange offset-right-5 offset-bottom-5"></span>
						<Button className="post-a-job-btn" type="primary" href="/job_category">Post A Job</Button>
					</section>

					<section className="section2">
						<div className="holder">
							<h2>Companies who are looking for Data Science and AI Engineers <br />are working with Evolve AI Marketplace</h2>
							<ul>
								<li><img src={amazonLogo} alt="Home Page" /></li>
								<li><img src={amazonLogo} alt="Home Page" /></li>
								<li><img src={amazonLogo} alt="Home Page" /></li>
								<li><img src={amazonLogo} alt="Home Page" /></li>
								<li><img src={amazonLogo} alt="Home Page" /></li>
							</ul>
						</div>
						<img className="squareImage offset-left-2 offset-top-5" src={icon2} alt="Home Page" />
						<img className="mixImage offset-right-0 offset-bottom-0" src={icon1} alt="Home Page" />
					</section>

					<section className="section3">
						<div className="holder">
							<h2>How Evolve AI Marketplace is a gamechanger <br />for finding the right AI engineer for you?</h2>						
						</div>
					</section>


				</div>

				<StaticFooter />
			</div>
		);
	}
}

export default workWithFreelancer;

