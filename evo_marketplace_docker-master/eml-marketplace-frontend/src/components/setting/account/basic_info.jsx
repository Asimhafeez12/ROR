import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'antd';
import Defender from './../../../helpers/defender';
import * as uActions from './../../../actions/users';

const FormItem = Form.Item;


class BasicInfo extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            //const {  avatar } = this.props.avatarReducer;
            data["first_name"] = values.first_name;
			data["last_name"] = values.last_name;
	        // if (avatar)
	        //   data["avatar"] = avatar;
          	this.props.dispatch(uActions.update(data)).then((res) => {
	          if (!that.props.user_view_reducer.success) {
		            this.props.dispatch(uActions.updateCurrentUser()).then( () => {
					  if (Defender.currentUser()._r.includes("client")){
					  	window.location = "/client"
					  }
					  if (Defender.currentUser()._r.includes("freelancer")){
					  	window.location = "/freelancer"
					  }
		            });
	          }
	          	else{
		            this.props.dispatch(uActions.updateCurrentUser()).then( () => {
					  if (Defender.currentUser()._r.includes("client")){
					  	window.location = "/client"
					  }
					  if (Defender.currentUser()._r.includes("freelancer")){
					  	window.location = "/freelancer"
					  }
		            });
		        }
			});
        }
    	else {
    	}
    });
  }

	render(){
		const { getFieldDecorator } = this.props.form;

 		return(
			<div className="input-fields-holder">
				<Form key={2} className="basic-info-form" onSubmit={this.handleSubmit.bind(this)}>
					<div className="security-form-row">
						<label className="required-field">First Name</label>
			              <FormItem>
			                  {getFieldDecorator('first_name',{
			                  	initialValue: Defender.currentUser().first_name
			                  })(
			                	<input type="text" />
			                  )}
			              </FormItem>
					</div>
					<div className="security-form-row">
						<label className="required-field">Last Name</label>
			              <FormItem>
			                  {getFieldDecorator('last_name',{
			                  	initialValue: Defender.currentUser().last_name
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
		);
	}
}

function mapStateToProps(state, ownProps) {
  return {
    user_view_reducer: state.user_view_reducer,
    avatarReducer: state.avatar,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
// 	    update_info: (data) => (dispatch(uActions.update(data))),
// 	  };
// }

const wrappedBasicInfoForm = Form.create()(BasicInfo);
export default connect(mapStateToProps)(wrappedBasicInfoForm);
