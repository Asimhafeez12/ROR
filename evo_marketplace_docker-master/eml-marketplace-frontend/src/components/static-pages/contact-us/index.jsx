import React, { Component } from 'react';
import { Input, Button, Form, Icon, message } from 'antd';
import { connect } from 'react-redux';
import StaticFooter from './../layout/footer';
import * as cuActions from './../../../actions/contact_us';
const FormItem = Form.Item;


class contactUs extends Component{

  handleSubmit = (e) => {
	e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let  data = {}
        data["full_name"] = values.full_name;
        data["email"] = values.email;
        data["message"] = values.message;
        this.props.contact_us(data).then((res) => {
        	this.props.form.resetFields();
        	message.success("Message Sent")
        });
      } else {
        //this.enterLoading();
      }
    });
  }
	render(){
		const { TextArea } = Input;
		const { getFieldDecorator } = this.props.form;
		document.body.classList.add('contact_us_page');
		return(
			<div className="contact-us-holder">
				<div className="contact-us-body">
					<div className="contact-us-content">
						<h1>Contact Us</h1>
						<p>Complete the form below and a representative from Wurker.ai will contact you as soon as possible. Please email our customer support for immediate assistance.</p>
					</div>
					<div className="form-holder">
						<Form key={1} onSubmit={this.handleSubmit}>
							<FormItem>
								{getFieldDecorator('full_name', {
								  rules: [{ required: true, message: 'Please input your Name' }],
								})(
									<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your Name" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('email', {
									rules: [{
										type: 'email', message: 'The input is not valid'
									}, {
										required: true, message: 'Please input your Email'
									}],
								})(
									<Input size="large" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('message', {
								  rules: [{ required: true, message: 'Please input your Message' }],
								})(
									<TextArea placeholder="Message" autosize={{ minRows: 4, maxRows: 4 }} />
								)}
							</FormItem>
							<Button className="contact-us-btn" htmlType="submit" type="primary">Submit</Button>
						</Form>
					</div>
				</div>

				<StaticFooter />
				<span className="square-icon deg45 x3 blue offset-left-3 offset-top-4"></span>
				<span className="plus-icon x3 orange offset-right-3 offset-top-3"></span>
				<span className="triangle-icon bottom x2 offset-left-5 offset-top-5"></span>
				<span className="square-icon deg45 x3 red offset-right-5 offset-top-5"></span>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
      contact_us: (data) => (dispatch(cuActions.submitForm({contact_us: data})))
  };
}

const wrappedContactUsForm = Form.create()(contactUs);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedContactUsForm);
