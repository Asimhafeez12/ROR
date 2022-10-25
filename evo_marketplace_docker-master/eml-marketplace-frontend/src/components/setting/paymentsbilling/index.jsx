import React, { Component } from 'react';
import { Skeleton } from 'antd';
import billingBanner from './../../../images/wurker-escrow.png';
import StripeImage from './../../../images/stripe-logo.png';


class paymentsBilling extends Component{

	componentWillMount() {
		setTimeout(() => {
			this.setState({ loading2: false });
		}, 2000);
	}

	state = {
		loading2: true
	}

	render(){
 		return(
			<div className="paymentsbilling-holder">
				<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
					<h1>Payments & Billing</h1>
					<ul className="paymentsbilling-list">
						<li>
							<div className="left-align">
								<div className="image-holder">
									<img className="billing_banner" src={billingBanner} alt="Payment | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<div className="paymentsbilling-contents">
									<h2>Escrow.com</h2>
									<span>We use escrow.com for secrue payments. Please create an account on escrow.com</span>
								</div>
							</div>
							<div className="right-align">
								<a target="_blank" rel="noopener noreferrer" className="create-account-btn" href="https://www.escrow.com/signup-page">Create an Account</a>
							</div>
						</li>
						<li>
							<div className="left-align">
								<div className="image-holder">
									<img className="billing_banner" src={StripeImage} alt="Payment | Wurker.ai - Connecting Top AI talent with Cool Companies" />
								</div>
								<div className="paymentsbilling-contents">
									<h2>Stripe</h2>
									<span>Comming Soon</span>
								</div>
							</div>
						</li>
					</ul>
				</Skeleton>
			</div>
		);
	}
}

export default paymentsBilling;

