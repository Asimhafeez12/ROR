import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

class Newsletter extends Component{
	render(){
		return(
			<div className="newsletter-block">
				<div className="newsletter-holder">
					<h4>Subscribe to Weekly Newsletter</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<Form onSubmit={this.handleSubmit}>
						<Input size="large" type="email" placeholder="Enter Email address" />
						<Button size="large" htmlType="submit">Subscribe</Button>
					</Form>	
				</div>
			</div>
		);
	}
}

export default Newsletter;