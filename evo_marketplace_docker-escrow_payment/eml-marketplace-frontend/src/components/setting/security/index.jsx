import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Select } from 'antd';
import * as uActions from './../../../actions/users';
import ChangePassword from './change_password';
const FormItem = Form.Item;


class Security extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            data["security_question"] = values.security_question;
            data["security_answer"] = values.security_answer;
          	this.props.update_security_info(data);
          	window.location = '/';
        }
    	else {
    	}
    });
  }

	render(){
		const Option = Select.Option;
		const { getFieldDecorator } = this.props.form;

 		return(
			<div className="security-holder">
				<ChangePassword />
				<div className="input-fields-holder">
					<h2>Security Question</h2>
					<Form key={1} className="security-question-form" onSubmit={this.handleSubmit.bind(this)}>
						<div className="security-form-row">
							<label className="required-field">Set Security Question</label>
							{getFieldDecorator('security_question',{
					  			})(
							<Select
								showSearch
								placeholder="Choose Question"
								optionFilterProp="children"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								<Option value="15/6/2018">15/6/2018</Option>
								<Option value="15/6/2018">15/6/2018</Option>
								<Option value="15/6/2018">15/6/2018</Option>
							</Select>
							)}
  						</div>
						<div className="security-form-row">
							<label className="required-field">Answer</label>
				              <FormItem>
				                  {getFieldDecorator('security_answer',{
				                  })(
				                	<input type="text" />
				                  )}
				              </FormItem>
						</div>
						<div className="security-form-row">
							<Button type="primary" htmlType="submit">Save Changes</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
    user_view_reducer: state.user_view_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
     update_security_info: (data) => (dispatch(uActions.update(data))),
  };
}

const wrappedSecurityForm = Form.create()(Security);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedSecurityForm);
