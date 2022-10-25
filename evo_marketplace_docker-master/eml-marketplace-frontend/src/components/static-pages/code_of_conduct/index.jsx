import React, { Component } from 'react';
import StaticFooter from './../layout/footer';

class CodeOfConduct extends Component{
	render(){
		return(
			<div className="custom-static-page">
				<div className="custom-static-header">
					<div className="holder">
						<h1>Code of Conduct</h1>
					</div>
				</div>
				<div className="custom-static-body">
					<div className="holder">
						<div className="custom-static-body-top">
							<p>PLEASE READ AND UNDERSTAND THE CODE OF ETHICS (THIS “CODE OF ETHICS”). YOU ARE OBLIGED TO COMPLY WITH THE TEXT OF THIS CODE AND ITS CONTENT. THE WURKER.AI CODE OF ETHICS IS ONE OF THE WAYS WE PUT WURKER.AI’S VALUES INTO PRACTICE.</p>
						</div>
						<div className="custom-static-body-bottom">
							<h3>Who Must Follow Our Code?</h3>
							<p>We expect all of our visitors, users and others who access or use the service (the "website", “wurker.ai”) follow the Code (this “code of ethics”). failure to do so can result in disciplinary action, including suspend or terminate your account or your access to the site (the "website", “wurker.ai”,the "service"). If you disagree with any part of the terms then you may not access the Service.</p>
							<h3>Code</h3>
							<p className="no-margin">You will behave as following while using our Wurker.ai:</p>
							<ul>
								<li>Act ethically and with integrity.</li>
								<li>Be fair, friendly and patient.</li>
								<li>Be respectful.</li>
								<li>Avoid harm</li>
								<li>Honor confidentiality.</li>
								<li>Respect the rights of all Users.</li>
								<li>Respect confidentiality and privacy.</li>
								<li>Provide true and correct information.</li>
								<li>Responsible for the content post on Wurker.ai</li>
								<li>Keep the work accurate, complete and correct.</li>
								<li>Deal with everyone fairly and in accordance with laws.</li>
								<li>Not engage in personal attacks, negative or other unfair criticism, and any unprofessional conduct.</li>
								<li>Not engage in fraud.</li>
								<li>Not disclose acquired information or documents.</li>
								<li>Not post content that violates any law or regulation.</li>
								<li>Not post content that includes incomplete, false or inaccurate information about any person.</li>
								<li>Not use Wurker.ai to generate false feedback.</li>
								<li>Not do anything that infringes wurker.Ai user agreement and all other policies.</li>
								<li>Not post content that infringes upon any copyright or other intellectual property rights.</li>
								<li>Not post content that contains any viruses or programming routines intended to damage any system.</li>
								<li> Not post content that creates liability or harms its business operations or reputation for Wurker.ai.</li>
								<li>Be careful in the words.</li>
								<li>Don't harass, bully or discriminate.</li>
								<li>Do not seek to communicate or receive payments off-site.</li>
								<li>Not use the Wurker.ai to illegally transfer funds.</li>
								<li>Not use Wurker.ai for money exchange like cryptocurrency (e.g. bitcoin, ethereum, etc).</li>
								<li>Ask for help when unsure.</li>
							</ul>
						</div>
					</div>
				</div>
				<StaticFooter />
			</div>
		);
	}
}

export default CodeOfConduct;