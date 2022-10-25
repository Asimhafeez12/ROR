import React, { Component } from 'react';
import { Button } from 'antd';
import StaticFooter from './../layout/footer';
import evaluationImage from './../../../images/evaluation-image.png';
import dotImage from './../../../images/icons/icon5.png';
import squareImage from './../../../images/icons/icon11.png';
import lineImage from './../../../images/icons/icon2.png';

class Evaluation extends Component{
	render(){
		return(
			<div className="evaluation-holder">
				<div className="evaluation-body">
					<section className="section1">
						<div className="holder">
							<h1>Our Evaluation Process</h1>
							<p>Wurker.ai has a rigorous onboarding process for freelancers to make sure that only the best AI Talent works with us.</p>
							<span className="triangle-icon bottom x2 offset-left-3 offset-top-5"></span>
							<span className="square-icon deg45 x3 light-green offset-right-3 offset-top-5"></span>
							<span className="square-icon deg45 x2 orange offset-left-5 offset-bottom-3"></span>
							<span className="circle-icon x2 pink offset-right-5 offset-bottom-3"></span>
						</div>
					</section>
					<main>
						<div className="evaluation-image-holder">
							<img src={evaluationImage} alt="Evaluation | Wurker.ai - Connecting Top AI talent with Cool Companies" />
						</div>
						<div className="all-secion-holder">
							<section className="section2 section-block left-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 1</span>
									<h2>General Interview</h2>
									<p>Wurker.ai conducts a general introductory interview to gauge freelancer’s communication skill and their experience.</p>
								</div>
								<span className="square-icon deg45 x2 blue offset-right-5 offset-top-3"></span>
								<span className="circle-icon x2 pink offset-right-4 offset-top-3"></span>
							</section>
							<section className="section3 section-block right-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 2</span>
									<h2>Technical Test</h2>
									<p>After the general interview, applicants must clear a technical test, designed around industry standards, ensuring that the applicants are ready to work on challenging AI projects.</p>
								</div>
								<span className="square-icon deg45 x2 orange offset-left-5 offset-top-3"></span>
								<span className="plus-icon x4 pink offset-left-5 offset-top-5"></span>
							</section>
							<section className="section4 section-block left-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 3</span>
									<h2>Technical Interview</h2>
									<p>Following the technical test, Wurker.ai conducts a technical interview to understand the applicant’s problem solving approach.</p>
								</div>
								<div className="dotted-image offset-right-5 offset-top-1">
									<img src={dotImage} alt="Dot | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
							</section>
							<section className="section5 section-block right-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 4</span>
									<h2>Continued Excellence</h2>
									<p>Wurker.ai conducts regular work review of all our freelancers to make sure that they are providing excellent services to our clients and are in line with our company values.</p>
								</div>
								<span className="square-icon x2 blue offset-left-4 offset-top-1"></span>
								<div className="square-image offset-left-5 offset-top-0">
									<img src={squareImage} alt="Square | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<div className="line-image offset-left-1 offset-bottom-1">
									<img src={lineImage} alt="Line | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>								
							</section>
						</div>
					</main>
					<section className="section6">
						<div className="holder">
							<h2>Find the Best Engineers</h2>
							<p>Wurker.ai takes the pain out of finding the right engineer for your project. Start working with us.</p>
							<Button type="primary" href="/job_creation">Hire Now</Button>
						</div>
						<span className="square-icon deg45 x2 pink offset-left-3 offset-top-5"></span>
						<span className="circle-icon x3 blue offset-right-3 offset-top-5"></span>
					</section>
				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default Evaluation;