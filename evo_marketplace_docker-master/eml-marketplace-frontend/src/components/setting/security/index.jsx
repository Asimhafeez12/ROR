import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Skeleton } from 'antd';
import * as uActions from './../../../actions/users';
import ChangePassword from './change_password';
import Defender from './../../../helpers/defender';


class Security extends Component{

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
            data["security_question"] = values.security_question;
            data["security_answer"] = values.security_answer;
          	this.props.update_security_info(data);
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
 		return(
			<div className="security-holder">
				<Skeleton loading={this.state.loading2} avatar={false} title={true} paragraph={true} active>
					<ChangePassword />
{/*					<div className="input-fields-holder">
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
					</div>*/}
				</Skeleton>
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
