import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import Defender from './../../../helpers/defender';
import * as uActions from './../../../actions/users';
import BasicInfo from './basic_info';

const FormItem = Form.Item;


class Account extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            data["deactivation_reason"] = values.deactivation_reason;
            data["is_not_active"] = true;
          	this.props.deactivate_account(data);
          	Defender.logout();
          	window.location = '/';
        }
    	else {
    	}
    });
  }

	render(){
		const { TextArea } = Input;
		const { getFieldDecorator } = this.props.form;

 		return(
			<div className="account-holder">
				<BasicInfo />
				<div className="input-fields-holder">
					 <Form key={1} className="deactivation-form" onSubmit={this.handleSubmit.bind(this)}>
						<div className="security-form-row">
							<div className="account-deactivation-block">
								<label>Account Deactivation</label>
								<div className="field-align-right">
									<span>What happens when you deactivation your account?</span>
									<ul>
										<li>Your Profile and Jobs won't be shown on the plateform.</li>
										<li>Active orders will be cancelled.</li>
										<li>You won't be able to re-activate you account.</li>
									</ul>
								</div>
							</div>
				              <FormItem>
				                  {getFieldDecorator('deactivation_reason',{
				                  })(
				                	<TextArea placeholder="I am leaving because" rows={4} />
				                  )}
				              </FormItem>
						</div>
						<div className="security-form-row">
							<Button type="primary" htmlType="submit">Deactivate Account</Button>
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
     deactivate_account: (data) => (dispatch(uActions.update(data))),
  };
}

const wrappedDeactivateUserForm = Form.create()(Account);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedDeactivateUserForm);
