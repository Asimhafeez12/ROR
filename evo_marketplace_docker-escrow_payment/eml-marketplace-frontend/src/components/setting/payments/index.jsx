import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Button, Icon, Form, Input, Modal } from 'antd';
import payment_logo from './../../../images/visa-logo.png';
import ic_shield from './../../../images/ic_shield.png';



class Setting extends Component{

	state = {
		showPopup: false,
	}

	PaymentPopup(showPopup) {
		this.setState({ showPopup });
	}

	handleCancel = (e) => {
		this.PaymentPopup(false);
	}

	handleOk = (e) => {
		this.PaymentPopup(false);
	}


	render(){

		//const FormItem = Form.Item;
		//const { TextArea } = Input;
		const confirm = Modal.confirm;
		//const { getFieldDecorator } = this.props.form;

		function showDeleteConfirm() {
			confirm({
				title: 'Do you really want to delete this card?',
				content: 'Your card will be deleted permanently and you will have to add a card again whenever you want to make payments.',
				okText: 'Delete',
				cancelText: 'Cancel',
				width: '600px',
				className:'confirm-popup',
			});
		}

 		return(
			<div className="payment-holder">
				<Button onClick={() => this.PaymentPopup(true)} size="large" className="payment-btn outline-btn">Add Payment Method</Button>
				<table>
					<thead>
						<tr>
							<th>Cards</th>
							<th>Type</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<img className="payment-logo" src={payment_logo} alt="Payment Logo" />
								<ul>
									<li>****</li>
									<li>****</li>
									<li>****</li>
									<li>4913</li>
								</ul>
							</td>
							<td>Primary</td>
							<td>
								<div className="button-holder">
									<a href=""><Icon type="edit" theme="outlined" /></a>
									<a onClick={showDeleteConfirm}><Icon type="delete" theme="outlined" /></a>
								</div>
							</td>
						</tr>
					</tbody>
				</table>

				<Modal
					title="Add Billing Method"
					centered
					width={'100%'}
					visible={this.state.showPopup}
					onCancel={this.handleCancel}
					onOk={this.handleOk}
					bodyStyle={{ padding: 0 }}
					className="payment_popup"
					footer={[
						<Form key={1} className="payment-form" onSubmit={this.handleSubmit}>
							<div className="payment-form-row">
								<label className="required-field">Card Number</label>
								<Input className="card-number-imput" prefix={<Icon type="credit-card" theme="filled" />} suffix={ <div className="payment_logo"><img src={ic_shield} alt="Payment Logo" /><span>Your card is saved securely</span></div> } type="text" />
							</div>

							<div className="payment-form-row">
								<div className="security-form-columns">
									<label className="required-field">First Name</label>
									<Input type="text" />
								</div>
								<div className="security-form-columns">
									<label className="required-field">Last Name</label>
									<Input type="text" />
								</div>
							</div>

							<div className="payment-form-row">
								<div className="security-form-columns">
									<label className="required-field">Expiry</label>
									<div className="low-width">
										<Input type="text" placeholder="MM" />
									</div>
									<div className="low-width">
										<Input type="text" placeholder="YY" />
									</div>
								</div>
								<div className="security-form-columns">
									<label className="required-field">CVV</label>
									<Input type="text" />
								</div>
							</div>

							<div className="payment-form-row button-holder">
								<Button key="back" onClick={this.handleCancel}>Cancel</Button>
								<Button key="submit" onClick={this.handleOk} type="primary" htmlType="submit">Save</Button>
							</div>
						</Form>
         			]}
					>
				</Modal>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(Setting);


export default WrappedNormalLoginForm;

