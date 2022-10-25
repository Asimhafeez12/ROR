import React, { Component } from 'react';
import { Button, Carousel } from 'antd';
import StaticFooter from './../layout/footer';
import icon1 from './../../../images/icons/icon9.png';
import icon2 from './../../../images/icons/icon11.png';
import icon4 from './../../../images/icons/icon1.png';
import icon5 from './../../../images/icons/icon5.png';
import icon6 from './../../../images/icons/icon7.png';
import icon7 from './../../../images/icons/icon8.png';
import icon8 from './../../../images/icons/icon13.png';
import icon9 from './../../../images/icons/icon2.png';
import icon10 from './../../../images/icons/icon12.png';
import awsLogo from './../../../images/company-logos/aws-logo.png';
import nvidiaLogo from './../../../images/company-logos/logo-nvidia.png';
import udemyLogo from './../../../images/company-logos/logo-udemy.png';
import bannerImage from './../../../images/expert-banner.png';
import lightImage from './../../../images/light-icon.png';
import user1 from './../../../images/user.png';
import quoteIcon from './../../../images/icons/ic_quote.png';
import fairIcon from './../../../images/icons/il_Fair.png';
import freeIcon from './../../../images/icons/il_Free.png';
import guarantedIcon from './../../../images/icons/il_Guaranted.png';


class workWithFreelancer extends Component{
	render(){
		return(
			<div className="work-with-freelancers-holder">
				<div className="work-with-freelancers-body">
					<section className="section1">
						<h1>Collaborate with Incredible AI<br/> Freelancers and Data Scientists</h1>
						<p>Wurker.ai takes care of hunting down the talent while <br/>you focus on building intelligent systems.</p>
						<span className="circle-icon x3 pink offset-left-3 offset-top-5"></span>
						<span className="square-icon deg45 x3 light-green offset-right-3 offset-top-5"></span>
						<span className="triangle-icon top x2 offset-left-5 offset-bottom-5"></span>
						<span className="square-icon deg45 x3 orange offset-right-5 offset-bottom-5"></span>
						<Button className="post-a-job-btn" type="primary" href="/job_creation">Post A Job</Button>
					</section>

					<section className="section2">
						<div className="holder">
							<h2>Companies that are pushing the AI space have partnered with Wurker.ai</h2>
							<ul>
								<li><img src={awsLogo} alt="Fortune | Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
								<li><img src={nvidiaLogo} alt="FatsCompany | Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
								<li><img src={udemyLogo} alt="Techcrunch | Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
							</ul>
						</div>
						<img className="squareImage offset-left-2 offset-top-5" src={icon2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						<img className="mixImage offset-right-0 offset-bottom-0" src={icon1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
					</section>

					<section className="section3">
						<div className="holder">
							<div className="block1">
								<h2>How Wurker.ai finds best AI Freelancers for you?</h2>
								<h3>Finding the “Right” AI Freelancer is a difficult task</h3>
								<p>The need for AI freelancers is skyrocketing but since it is a tough skill to master, there is a <br/>big shortage of talent in the industry which makes finding the right talent hard. We at <br/>Wurker.ai strive to make this process as smooth as possible.</p>
								<div className="banner-holder">
									<img src={bannerImage} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<span className="square-icon deg45 x2 pink offset-left-2 offset-top-3"></span>
								<img className="mixImage offset-right-0 offset-top-3" src={icon5} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								<span className="square-icon deg45 x2 light-green offset-left-0 offset-bottom-5"></span>
								<span className="triangle-icon bottom x2 offset-right-1 offset-bottom-5"></span>
							</div>
							<div className="block2">
								<h2>We Have the best AI and Data Science Experts onboard</h2>
								<p>Wurker.ai has a very stringent onboarding process that ensures the talent that has been<br/> brought on is second to none. We are highly selective and retain only the very best. We<br/> also make sure that only those engineers remain with us who are backed by excellent<br/> client feedback.</p>
								<Button className="pink-btn" href="/job_creation">Let us find an AI freelancer for you</Button>
								<span className="square-icon deg45 x3 light-green offset-left-0 offset-bottom-5"></span>
								<span className="circle-icon pink x1 offset-right-0 offset-bottom-5"></span>
							</div>
						</div>
					</section>

					<section className="section4">
						<div className="holder">
							<div className="block1">
								<div className="image-holder">
									<img src={lightImage} alt="Light | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<div className="content">
									<h2>4th Industrial Revolution</h2>
									<p>AI & Data Science is going to transform businesses. Using these technologies businesses can increase efficiency, reduce operational costs, increase revenue growth and improve customer experience by making data driven decisions.</p>
								</div>
							</div>
							<div className="block2">
								<h2>Gain Competitive Advantage Through the Power of AI</h2>
								<p>Artificial Intelligence is going to have a profound impact on the way businesses operate and maintain their competitive advantage. In order to become a real AI-driven enterprise, Organizations must incorporate AI into their daily operations so everyone in the organization has fast access to accurate data and insights to make best decisions. We understand that and provide quality AI freelancers needed to develop those solutions.</p>
							</div>
							<img className="mixImage offset-left-0 offset-top-0" src={icon4} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							<img className="mixImage2 offset-right-0 offset-top-0" src={icon5} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							<span className="circleicon1 circle-icon light-green x3 offset-left-0 offset-bottom-2"></span>
							<span className="circleicon2 circle-icon gray x1 offset-right-0 offset-bottom-0"></span>
						</div>
					</section>

					<section className="section5">
						<div className="holder">
							<div className="block1">
								<h2>Future of Work is Freelancing</h2>
								<p>"The supreme accomplishment is to blur the line between work and play."</p>
							</div>
							<div className="block2">
								<div className="block-column">
									<h3>Techcrunch</h3>
									<span>Freelancers rights come of age as gig economy boom</span>
									<a href="https://techcrunch.com/2018/10/31/freelancers-rights-come-of-age-as-gig-economy-booms/" rel="noopener noreferrer" target="_blank" className="full-story-btn">Read Full Story</a>
								</div>
								<div className="block-column">
									<h3>Forbes</h3>
									<span>The Gig Economy Will Only Keep Growing In Numbers</span>
									<a href="https://www.forbes.com/sites/abdullahimuhammed/2018/06/28/4-reasons-why-the-gig-economy-will-only-keep-growing-in-numbers/#1aa6eb6e11eb" rel="noopener noreferrer" target="_blank" className="full-story-btn">Read Full Story</a>
								</div>
								<div className="block-column">
									<h3>Entrepreneur</h3>
									<span>The Future Is Freelance</span>
									<a href="https://www.entrepreneur.com/article/312735" rel="noopener noreferrer" target="_blank" className="full-story-btn">Read Full Story</a>
								</div>
								<img className="mixImage offset-right-0 offset-top-0" src={icon6} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								<img className="mixImage2 offset-left-0 offset-top-0" src={icon7} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
								<img className="mixImage3 offset-right-0 offset-top-0" src={icon8} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div style={{display:'none'}} className="block3">
								<h2>Results beyond Expectations</h2>
								<Carousel autoplay className="expactations-slider">
									<div className="custom-slide-holder">
										<div className="top-icon">
											<img src={quoteIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</div>
										<div className="top-content">
											<p>1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
										</div>
										<div className="bottom-content">
											<div className="slide-image-holder">
												<img src={user1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
											</div>
											<div className="content">
												<strong className="username-text">Usama Qureshi</strong>
												<span className="designation-text">DSM Officer, Kips</span>
											</div>
										</div>
									</div>
									<div className="custom-slide-holder">
										<div className="top-icon">
											<img src={quoteIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />										
										</div>
										<div className="top-content">
											<p>2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
										</div>
										<div className="bottom-content">
											<div className="slide-image-holder">
												<img src={user1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
											</div>
											<div className="content">
												<strong className="username-text">Ali Qureshi</strong>
												<span className="designation-text">DSM Officer, Kips</span>
											</div>
										</div>
									</div>
									<div className="custom-slide-holder">
										<div className="top-icon">
											<img src={quoteIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />										
										</div>
										<div className="top-content">
											<p>3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
										</div>
										<div className="bottom-content">
											<div className="slide-image-holder">
												<img src={user1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
											</div>
											<div className="content">
												<strong className="username-text">Butt Qureshi</strong>
												<span className="designation-text">DSM Officer, Kips</span>
											</div>
										</div>
									</div>
								</Carousel>
							</div>
						</div>
						<img className="mixicon1 offset-left-0 offset-bottom-0" src={icon5} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						<span className="mixicon2 square-icon deg45 x3 light-green offset-right-5 offset-bottom-3"></span>
					</section>

					<section className="section6">
						<div className="holder">
							<h2>What we do?</h2>
							<p>Our mission is to create a global community of best AI developers and connect them with world class companies to build the future of tech.</p>
							<div className="four-columns">
								<div className="column blue">
									<h3>Elite Engineers</h3>
									<p>We have a very thorough and diligent process to make sure we only have world class AI talent on our platform.</p>
								</div>
								<div className="column pink">
									<h3>Expert Matching</h3>
									<p>Our domain experts analyze the client requirements meticulously and recommend the most suitable engineers.</p>
								</div>
								<div className="column yellow">
									<h3>Divide & Conquer</h3>
									<p>Projects can be broken down into smaller modules called "Milestones" for better project management.</p>
								</div>
								<div className="column cyan">
									<h3>Fast & Easy</h3>
									<p>Wurker.ai offers easy job posting, perfect matching, messaging and swift payment processing for an amazing experience.</p>
								</div>
							</div>
						</div>
						<img className="mixicon1 offset-right-0 offset-top-0" src={icon7} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						<img className="mixicon2 offset-left-0 offset-bottom-0" src={icon9} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
					</section>

					<section className="section7">
						<div className="holder">
							<div className="column column1">
								<strong className="column-cell column-heading"><h2>Why Choose Us</h2></strong>
								<strong className="column-cell">Technical skills evaluation</strong>
								<strong className="column-cell">Time before contracting</strong>
								<strong className="column-cell">Fees</strong>
								<strong className="column-cell">Termination Charges</strong>
								<strong className="column-cell">Right talent for the right project</strong>
								<strong className="column-cell">Dedicated talent</strong>
								<strong className="column-cell">Contract follow up</strong>
							</div>
							<div className="column column2">
								<span className="column-cell column-heading"><h2>Evolve AI <br />Marketplace</h2></span>
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

					<section className="section8">
						<div className="holder">
							<h2>Our Service</h2>
							<div className="three-columns">
								<div className="column">
									<div className="image-holder">
										<img src={freeIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
									<div className="content">
										<h3>Free</h3>
										<p>We don't charge clients any fee for finding and recommending the AI Freelancers.</p>
									</div>
								</div>
								<div className="column">
									<div className="image-holder">
										<img src={fairIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
									<div className="content">
										<h3>Fair & Transparent</h3>
										<p>No Hidden costs</p>
									</div>
								</div>
								<div className="column">
									<div className="image-holder">
										<img src={guarantedIcon} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
									<div className="content">
										<h3>Guaranteed</h3>
										<p>If you are not satisfied with the hired AI freelancer, He/She will be replaced with a new expert without any extra charges.</p>
									</div>
								</div>
							</div>
							<Button className="find-freelancer-btn" type="primary" href="">Let's find an AI Freelancer</Button>
							<img className="mixicon1 offset-left-2 offset-top-4" src={icon2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							<img className="mixicon2 offset-right-1 offset-top-2" src={icon10} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							<span className="mixicon3 triangle-icon left x2 offset-left-3 offset-bottom-2"></span>
							<img className="mixicon4 offset-right-3 offset-bottom-2" src={icon5} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
					</section>
				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default workWithFreelancer;

