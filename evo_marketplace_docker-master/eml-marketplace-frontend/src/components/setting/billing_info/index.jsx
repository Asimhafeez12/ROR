import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Checkbox, Skeleton } from 'antd';
import Defender from './../../../helpers/defender';
import * as ubActions from './../../../actions/users/user_billings';

const FormItem = Form.Item;


class BillingInfo extends Component{

	state = {
		loading2: true,
	};

	componentWillMount() {
		setTimeout(() => {
			this.setState({ loading2: false });
		}, 2000);
	}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            data["first_name"] = values.first_name;
            data["last_name"] = values.last_name;
            data["address"] = values.address;
            data["city"] = values.city;
            data["zip_code"] = values.zip_code;
            data["country"] = values.country;
            data["send_invoice"] = values.send_invoice;
          	this.props.add_billing(Defender.currentUser().id, data);
			if (Defender.currentUser()._r.includes("client")){
				window.location = "/client"
			}
			if (Defender.currentUser()._r.includes("freelancer")){
				window.location = "/freelancer"
			}
        }
    	else {
    	}
    });
  }
	render(){
		const Option = Select.Option;
		const { TextArea } = Input;
		const { getFieldDecorator } = this.props.form;

 		return(
			<div className="billing-holder">
				<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
					<div className="input-fields-holder">
						<Form key={1} className="user-info-form" onSubmit={this.handleSubmit.bind(this)}>
							<div className="security-form-row">
								<div className="security-form-columns">
									<label className="required-field">First Name</label>
					              <FormItem>
					                  {getFieldDecorator('first_name',{
					                  	initialValue: Defender.currentUser().first_name
					                  })(
					                	<input type="text" />
					                  )}
					              </FormItem>
									
								</div>
								<div className="security-form-columns">
									<label className="required-field">Last Name</label>
					              <FormItem>
					                  {getFieldDecorator('last_name',{
					                  	initialValue: Defender.currentUser().last_name
					                  })(
					                	<input type="text" />
					                  )}
					              </FormItem>
								</div>
							</div>
							<div className="security-form-row">
								<div className="security-form-columns">
									<label className="required-field">Country</label>
									{getFieldDecorator('country',{
						  			})(
									<Select
										showSearch
										placeholder="Choose Country"
										optionFilterProp="children"
										filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
									>
										<Option value="Pakistan">Pakistan</Option>
										<Option value="India">India</Option>
										<Option value="USA">USA</Option>
										<Option value="UAE">UAE</Option>
									</Select>
									)}
								</div>
							</div>
							<div className="security-form-row">
								<label className="required-field">Address</label>
					              <FormItem>
					                  {getFieldDecorator('address',{
					                  	initialValue: Defender.currentUser().address
					                  })(
					                	<TextArea rows={4} />
					                  )}
					              </FormItem>
							</div>
							<div className="security-form-row">
								<div className="security-form-columns">
									<label className="required-field">City</label>
					              <FormItem>
					                  {getFieldDecorator('city',{
					                  	initialValue: Defender.currentUser().city
					                  })(
					                	<input type="text" />
					                  )}
					              </FormItem>
								</div>
							</div>
							<div className="security-form-row">
								<div className="security-form-columns">
									<label className="required-field">Zip Code</label>
					              <FormItem>
					                  {getFieldDecorator('zip_code',{
					                  	initialValue: Defender.currentUser().zip_code
					                  })(
					                	<input type="text" />
					                  )}
					              </FormItem>
								</div>
							</div>
							<div className="security-form-row">
					          <FormItem>
					            {getFieldDecorator('send_invoice', {
					              valuePropName: 'checked',
					              initialValue: true,
					            })(
					             <Checkbox>Send me invoices via Email</Checkbox>
					            )}
					          </FormItem>
							</div>
							<div className="security-form-row">
								<Button type="primary" htmlType="submit">Save</Button>
							</div>
						</Form>
					</div>
				</Skeleton>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
    user_billings_reducer: state.user_billings_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
     add_billing: (user_id, data) => (dispatch(ubActions.add(user_id, data))),
  };
}

const wrappedBillingInfoForm = Form.create()(BillingInfo);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedBillingInfoForm);


