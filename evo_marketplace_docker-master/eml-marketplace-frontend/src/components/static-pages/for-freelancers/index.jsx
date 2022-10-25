import React, { Component } from 'react';
import { Button } from 'antd';
import StaticFooter from './../layout/footer';
import icon2 from './../../../images/icons/icon11.png';
import icon3 from './../../../images/icons/icon10.png';
import icon4 from './../../../images/icons/icon1.png';
import icon12 from './../../../images/icons/icon6.png';
import icon7 from './../../../images/icons/icon8.png';
import forFreelancersBanner from './../../../images/ForFreelancers.png';


class workWithFreelancer extends Component{
	render(){
		return(
			<div className="work-with-freelancers-holder">
				<div className="work-with-freelancers-body">
					<section className="section1">
						<h1>A network of the best AI freelancers<br/> and data scientists</h1>
						<p>In this age, the talent hunt for the best AI freelancers is transcending borders. Engineers<br/> and developers now prefer the flexibility and freedom of freelancing and remote work,<br/> so employers are now more open to location independent opportunities.</p>
						<span className="circle-icon x3 pink offset-left-3 offset-top-5"></span>
						<span className="square-icon deg45 x3 light-green offset-right-3 offset-top-5"></span>
						<span className="triangle-icon top x2 offset-left-5 offset-bottom-5"></span>
						<span className="square-icon deg45 x3 orange offset-right-5 offset-bottom-5"></span>
						<Button className="post-a-job-btn" type="primary" href="/freelancer/sign_up">Apply</Button>
					</section>

					<section className="section2-new">
						<div className="holder">
							<h2>Find projects that fit you perfectly</h2>
							<p>Our evaluation process is carefully designed to accurately assess the expertise of<br />freelancers. Our administrators carefully analyze the requirements and make sure that<br/>you get projects that suit your skills perfectly.</p>
						</div>
						<div className="for-freelancer-banner">
							<img src={forFreelancersBanner} alt="Freelancer | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<div className="dots1-icon offset-left-1 offset-top-5">
							<img src={icon2} alt="Dots | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<div className="dots2-icon offset-right-1 offset-top-3">
							<img src={icon3} alt="Dots | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
					</section>

					<section className="section7">
						<div className="holder">
							<div className="column column1">
								<strong className="column-cell column-heading"><h2>Why Choose Wurker.ai</h2></strong>
								<strong className="column-cell">Technical Skills Evaluation</strong>
								<strong className="column-cell">Time Before Contracting</strong>
								<strong className="column-cell">Fees</strong>
								<strong className="column-cell">Termination Charges</strong>
								<strong className="column-cell">Right Talent for the Right Project</strong>
								<strong className="column-cell">Dedicated Talent</strong>
								<strong className="column-cell">Contract Follow up</strong>
							</div>
							<div className="column column2">
								<span className="column-cell column-heading"><h2>Wurker.ai</h2></span>
								<span className="column-cell">Yes</span>
								<span className="column-cell">0-48 hrs</span>
								<span className="column-cell">20%</span>
								<span className="column-cell">None</span>
								<span className="column-cell">Yes</span>
								<span className="column-cell">Yes</span>
								<span className="column-cell">Yes</span>
							</div>
							<div className="column column3">
								<span className="column-cell column-heading"><h2>IT Firms</h2></span>
								<span className="column-cell">Yes</span>
								<span className="column-cell">Weeks</span>
								<span className="column-cell">30-50%</span>
								<span className="column-cell">High</span>
								<span className="column-cell">No</span>
								<span className="column-cell">No</span>
								<span className="column-cell">Yes</span>
							</div>
							<div className="column column4">
								<span className="column-cell column-heading"><h2>Freelancers <br />Marketplaces</h2></span>
								<span className="column-cell">No</span>
								<span className="column-cell">Weeks</span>
								<span className="column-cell">20%</span>
								<span className="column-cell">None</span>
								<span className="column-cell">Random</span>
								<span className="column-cell">Random</span>
								<span className="column-cell">No</span>
							</div>
							<div className="column column5">
								<span className="column-cell column-heading"><h2>Typical <br />Employment</h2></span>
								<span className="column-cell">Random</span>
								<span className="column-cell">Months</span>
								<span className="column-cell">NA</span>
								<span className="column-cell">Very High</span>
								<span className="column-cell">No</span>
								<span className="column-cell">Yes</span>
								<span className="column-cell">NA</span>
							</div>
						</div>
						<span className="circle-icon x2 pink offset-right-1 offset-top-5"></span>
						<span className="circle-icon x1 blue offset-left-2 offset-bottom-2"></span>
						<span className="triangle-icon right x2 offset-right-5 offset-bottom-2"></span>
					</section>

					<section className="section8-new">
						<div className="section8-new-header">
							<div className="holder">
								<h2>How To Join Wurker.AI</h2>
								<p>Join A Global Network Of AI Superstars</p>
							</div>
						</div>
						<div className="section8-new-body">
							<div className="holder">
								<div className="left-block">
									<div className="section8-block blue-color">
										<span className="digit-holder">1</span>
										<h3>Apply</h3>
										<p>Fill out an application form and tell us about your achievements and knowledge of the domain.</p>
									</div>
									<div className="dots1-icon offset-right-0 offset-top-0">
										<img src={icon7} alt="Dots | Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
									<span className="circle-icon x2 light-green offset-right-5 offset-top-5"></span>
								</div>
								<div className="right-block">
									<div className="section8-block pink-color">
										<span className="digit-holder">2</span>
										<h3>General Interview</h3>
										<p>A 10-minute interview to test your communication skills, motivation behind applying and other basic stuff.</p>
									</div>
									<div className="dots1-icon offset-left-2 offset-top-0">
										<img src={icon4} alt="Dots | Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
									<span className="square-icon x2 offset-left-5 offset-top-1"></span>
								</div>
								<div className="left-block">
									<div className="section8-block cyan-color">
										<span className="digit-holder">3</span>
										<h3>Technical Interview</h3>
										<p>A 30-minute technical interview to know more about your knowledge of the domain, talk out your reasoning, awareness of the expertise and problem-solving process.</p>
									</div>
									<span className="square-icon blue x3 offset-right-3 offset-top-4"></span>
									<span className="circle-icon pink x2 offset-right-5 offset-top-5"></span>
								</div>
								<div className="right-block">
									<div className="section8-block yellow-color">
										<span className="digit-holder">4</span>
										<h3>Technical Coding Test</h3>
										<p>A technical coding test to evaluate your coding skills in different domains of Artificial Intelligence.</p>
									</div>
									<span className="square-icon orange x2 offset-left-5 offset-top-4"></span>
									<span className="circle-icon light-green x2 offset-left-3 offset-top-5"></span>
								</div>
								<div className="left-block">
									<div className="section8-block purple-color">
										<span className="digit-holder">5</span>
										<h3>Start Working</h3>
										<p>Once you have cleared the evaluation process, you are ready to take on exciting projects. You will be given badges as per your skills and you will get invitations to the most suited projects. Impress the client with your knowledge of the domain and start working.</p>
									</div>
									<div className="dots2-icon offset-right-2 offset-top-3">
										<img src={icon12} alt="Dots | Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
								</div>
								<div className="right-block">
									<div className="section8-block green-color">
										<span className="digit-holder">6</span>
										<h3>Get Paid</h3>
										<p>When a projected is posted, it is broken down into small milestones. Freelancers get paid through Escrow.com as soon as the client approves the milestone.</p>
									</div>
									<span className="square-icon light-green x3 offset-left-5 offset-top-4"></span>
								</div>
							</div>
						</div>
						<div className="section8-new-footer">
							<div className="holder">
								<Button className="join-team-btn" type="primary" href="/freelancer/sign_up">Join Now</Button>
								<p>Become Part of Our Elite Talent Pool of AI Freelancers and Start Working<br/> with Great Companies on Amazing Projects.</p>
							</div>
						</div>

					</section>

				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default workWithFreelancer;

