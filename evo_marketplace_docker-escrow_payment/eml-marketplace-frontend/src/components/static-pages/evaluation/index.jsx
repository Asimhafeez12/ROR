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
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<span className="triangle-icon bottom x2 offset-left-3 offset-top-5"></span>
							<span className="square-icon deg45 x3 light-green offset-right-3 offset-top-5"></span>
							<span className="square-icon deg45 x2 orange offset-left-5 offset-bottom-3"></span>
							<span className="circle-icon x2 pink offset-right-5 offset-bottom-3"></span>
						</div>
					</section>
					<main>
						<div className="evaluation-image-holder">
							<img src={evaluationImage} alt="Home Page img" />
						</div>
						<div className="all-secion-holder">
							<section className="section2 section-block left-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 01</span>
									<h2>Language & Personality</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								<span className="square-icon deg45 x2 blue offset-right-5 offset-top-3"></span>
								<span className="circle-icon x2 pink offset-right-4 offset-top-3"></span>
							</section>
							<section className="section3 section-block right-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 02</span>
									<h2>Technical Interview</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								<span className="square-icon deg45 x2 orange offset-left-5 offset-top-3"></span>
								<span className="plus-icon x4 pink offset-left-5 offset-top-5"></span>
							</section>
							<section className="section4 section-block left-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 03</span>
									<h2>Test Project</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								<div className="dotted-image offset-right-5 offset-top-1">
									<img src={dotImage} alt="Home Page img" />
								</div>
							</section>
							<section className="section5 section-block right-eval">
								<div className="eval-section-holder">
									<span className="evaluation-heading">Evaluation 04</span>
									<h2>Continued Excellence</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
								<span className="square-icon x2 blue offset-left-4 offset-top-1"></span>
								<div className="square-image offset-left-5 offset-top-0">
									<img src={squareImage} alt="Home Page img" />
								</div>
								<div className="line-image offset-left-1 offset-bottom-1">
									<img src={lineImage} alt="Home Page img" />
								</div>								
							</section>
						</div>
					</main>
					<section className="section6">
						<div className="holder">
							<h2>Best Engineers Lorem Ipsum</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<Button type="primary" href="/job_category">Hire Now</Button>
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