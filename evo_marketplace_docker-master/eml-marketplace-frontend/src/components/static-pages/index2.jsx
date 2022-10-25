import React, { Component } from 'react';
import { Button, Carousel } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import StaticFooter from './layout/footer';
import Defender from './../../helpers/defender';
import homePageImage2 from './../../images/il_header.png';
import howWorksImage1 from './../../images/ic_postajob.png';
import howWorksImage2 from './../../images/ic_reviewproposals.png';
import howWorksImage3 from './../../images/ic_interview_1.png';
import howWorksImage4 from './../../images/ic_securepayment_1.png';
import logoImage1 from './../../images/logo-betalist.png';
import logoImage2 from './../../images/logo_crunchbase.png';
import logoImage3 from './../../images/logo_producthunt.png';
import logoImage4 from './../../images/logo_angellist.png';
import * as hActions from './../../actions/home_illustrations';
import * as ljActions from './../../actions/last_jobs';
import moment from 'moment';


class HomePage extends Component{

	componentWillMount() {
	    this.props.fetchHomeIllustration();
	    this.props.fetchLastJob();
	}

	render(){
		if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("client")){
			this.props.dispatch(push('/client'));
		}
		if (Defender.currentUser() && Defender.currentUser()._r && Defender.currentUser()._r.includes("freelancer")){
			this.props.dispatch(push('/freelancer'));
		}
		document.body.classList.add('static-home-page');
		document.body.classList.remove('sign-in-page');
		const { home_illustrations } = this.props.home_illustrations_reducer;
		const { job } = this.props.lastJobReducer;
		

		var settings = {
			arrows: true,
			dots: true,
			infinite: true,
			adaptiveHeight: true,
			autoplay: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,

			responsive: [
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 4,
					}
				},
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
					}
				}
			]

		};

		return(
			<React.Fragment>
				{ this.props.auth.isAuthenticated ?
				"" :
					<React.Fragment>
						<div className="static-home-banner-holder2">
							<div className="home-image-holder2">
								<img src={homePageImage2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div className="static-home-content">
								<div className="static-home-holder">
									<h1>Hire expert AI & Tech freelancers <br/>and get stuff done with confidence</h1>
									<Button href="/job_creation" className="post-a-job-btn">Post a job now</Button>
								</div>
							</div>
						</div>

						<div className="professional-service-block additional-class">
							<div className="static-home-holder">
								<h2>Professional freelance services for you</h2>
								<div className="home-slider-top">
									<Carousel {...settings}>
										{home_illustrations.map( (category, index) =>
										<div className="slide" key={index}>
											<a href={'./job_creation'} >
												<div className="slider-image">
													<img src={category.avatar_url} alt="Avatar | Wurker.ai - Connecting Top AI talent with Cool Companies" />
												</div>
												<div className="slider-content2">
													<h3 title={category.title}>{category.title}</h3>
												</div>
											</a>
										</div>
										)}
									</Carousel>
								</div>
								{
									/*
									<div className="home-slider-bottom">
										<ul>
											<li><span>Our customers say</span></li>
											<li><strong>Excellent</strong></li>
											<li>
												<ul className="trust-pilot-rating">
													<li><img src={trustStar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
													<li><img src={trustStar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
													<li><img src={trustStar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
													<li><img src={trustStar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
													<li><img src={trustStar} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
												</ul>
											</li>
											<li><span>9.7 out of 10 based on 769 reviews</span></li>
											<li><img src={trustPilot} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
										</ul>							
									</div>
									*/
								}
							</div>
						</div>

						<div className="how-it-works-block">
							<div className="static-home-holder">
								<h2>How it works</h2>
								<div className="four-columns">
									<div className="column">
										<div className="image-holder">
											<img src={howWorksImage1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</div>
										<div className="how-it-works-content">
											<h4>Post a job for free</h4>
											<p>Tell us about your project by<br/>posting a job and filling out all<br/>required fields.</p>
										</div>
									</div>
									<div className="column">
										<div className="image-holder">
											<img src={howWorksImage2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</div>
										<div className="how-it-works-content">
											<h4>Get curated freelancers</h4>
											<p>Our experts will go through your requirements and select the 3 most<br/>suitable freelancers.</p>
										</div>
									</div>
									<div className="column">
										<div className="image-holder">
											<img src={howWorksImage3} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</div>
										<div className="how-it-works-content">
											<h4>Interview and hire</h4>
											<p>Recommended freelancers will<br/>submit their proposals. Interview<br/>and hire the one you like.</p>
										</div>
									</div>
									<div className="column">
										<div className="image-holder">
											<img src={howWorksImage4} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" />
										</div>
										<div className="how-it-works-content">
											<h4>Secure escrow payments</h4>
											<p>Only pay when the work is done, on milestone basis with Escrow.com.</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="hire-expert-block">
							<div className="static-home-holder">
								<h2>Popular AI & Tech skills to hire</h2>
								<ul>
									<li><a href="/job_creation/title?UI/UX Designer">UI/UX Designer</a></li>
									<li><a href="/job_creation/title?Web Designer">Web Designer</a></li>
									<li><a href="/job_creation/title?Product Designer">Product Designer</a></li>
									<li><a href="/job_creation/title?Freelance Developer">Freelance Developer</a></li>
									<li><a href="/job_creation/title?Front-End Developer">Front-End Developer</a></li>
									<li><a href="/job_creation/title?Full Stack Developer">Full Stack Developer</a></li>
									<li><a href="/job_creation/title?HTML5 Developer">HTML5 Developer</a></li>
									<li><a href="/job_creation/title?IOS Developer">IOS Developer</a></li>
									<li><a href="/job_creation/title?Android Developer">Android Developer</a></li>
									<li><a href="/job_creation/title?ROR Developer">ROR Developer</a></li>
									<li><a href="/job_creation/title?React.js Developer">React.js Developer</a></li>
									<li><a href="/job_creation/title?Wordpress Developer">Wordpress Developer</a></li>
									<li><a href="/job_creation/title?Python Developer">Python Developer</a></li>
									<li><a href="/job_creation/title?Machine Learning Developer">Machine Learning Developer</a></li>
									<li><a href="/job_creation/title?Deep Learning Developer">Deep Learning Developer</a></li>
									<li><a href="/job_creation/title?Data Scientist">Data Scientist</a></li>
									<li><a href="/job_creation/title?Data Analyst">Data Analyst</a></li>
									<li><a href="/job_creation/title?Computer Vision Engineer">Computer Vision Engineer</a></li>
									<li><a href="/job_creation/title?Robotics Engineer">Robotics Engineer</a></li>
									<li><a href="/job_creation/title?Reinforcement Learning Engineer">Reinforcement Learning Engineer</a></li>
									<li><a href="/job_creation/title?Data Engineer">Data Engineer</a></li>
									<li><a href="/job_creation/title?NLP Engineer">NLP Engineer</a></li>
									<li><a href="/job_creation/title?Cognitive System Engineer">Cognitive System Engineer</a></li>
									<li><a href="/job_creation/title?Keras Developer">Keras Developer</a></li>
									<li><a href="/job_creation/title?TensorFlow Developer">TensorFlow Developer</a></li>
									<li><a href="/job_creation/title?PyTorch Developer">PyTorch Developer</a></li>
									<li><a href="/job_creation/title?Neural Nets Developer">Neural Nets Developer</a></li>
									<li><a href="/job_creation/title?IBM Watson Developer">IBM Watson Developer</a></li>
									<li><a href="/job_creation/title?Google ML Engine Developer">Google ML Engine Developer</a></li>
									<li><a href="/job_creation/title?Big Data Engineer">Big Data Engineer</a></li>
									<li><a href="/job_creation/title?Hadoop Developer">Hadoop Developer</a></li>
								</ul>
							</div>
						</div>

						<div className="last-hire-block">
							<div className="static-home-holder">
								<h2>Last hire was made <span>{moment(job.created_at).fromNow()}</span>, on Wurker.ai</h2>
								<Button href="/job_creation" className="post-a-job-btn">Post a job and hire your ai freelancer now</Button>								
							</div>
						</div>

						<div className="see-on-logo-block">
							<div className="static-home-holder">
								<span>Seen on:</span>
								<ul>
									<li><img src={logoImage1} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
									<li><img src={logoImage2} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
									<li><img src={logoImage3} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
									<li><img src={logoImage4} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></li>
								</ul>
							</div>
						</div>
					</React.Fragment>
				}
				<React.Fragment>
					<StaticFooter />
				</React.Fragment>
			</React.Fragment>
		);
	}
}


function mapStateToProps(state) {
  return {
    home_illustrations_reducer: state.home_illustrations_reducer,
    lastJobReducer: state.lastJobReducer,
    auth: state.auth 
  }
}
function mapDispatchToProps(dispatch) {
  return {

    fetchHomeIllustration: () => {
      return dispatch(hActions.fetchHomeIllustration())
    },
    fetchLastJob: () => {
      return dispatch(ljActions.fetchLastJob())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

