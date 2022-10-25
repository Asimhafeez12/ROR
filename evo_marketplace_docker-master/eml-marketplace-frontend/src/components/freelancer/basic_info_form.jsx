import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as userActions from './../../actions/users/';
import * as uActions from '../../actions/freelance_profile';
import Defender from './../../helpers/defender';
import Avatar from './../dashboard/avatar';

const { TextArea } = Input;
const FormItem = Form.Item;

class BasicInfoForm extends Component {
  state = {
    confirmDirty: false,
    modal_basic_info: this.props.modal_basic_info
  }

  setModalBasicInfo(modal_basic_info) {
    this.setState({ modal_basic_info });
  }

  handleCancelBasicInfo(e){
    e.preventDefault();
    this.setState({ modal_basic_info: false });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {  avatar } = this.props.avatarReducer;
      let  data = {}
      data["title"] = values.title;
      data["summary"] = values.summary;
      if (avatar)
        data["avatar"] = avatar;
      this.props.update_basic_info(data).then((res) => {
      if (!this.props.freelancerProfile.success) {} 
        else {
          this.props.updateCurrentUser();
          this.props.fetchViewUser(Defender.currentUser().id);
          this.setState({
            modal_basic_info: false,
          });
        }
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props.user_view_reducer;

    return (
        <React.Fragment>
          <Modal
            title="Edit Overview"
            centered
            className="basic-info-modal-box"
            visible={this.state.modal_basic_info}
            onOk={() => this.setModalBasicInfo(false)}
            onCancel={() => this.setModalBasicInfo(false)}
            footer={[
            <Form key={1} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="popup-form-title">
                  {getFieldDecorator('title',{
                    initialValue: user.title,
                  })(
                  <Input size="large" placeholder="Title" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('summary',{
                    initialValue: user.summary,
                  })(
                <TextArea placeholder="Summary" autosize={{ minRows: 8, maxRows: 8 }} />
                  )}
              </FormItem>
              <h3 className="profile-photo-text">Profile Photo</h3>
              <Avatar />
              <Button key="back" onClick={this.handleCancelBasicInfo.bind(this)}>Cancel</Button>
                   <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
            </Form>
                ]}
          >
          </Modal>
        </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleBasicInfoForm: ownProps.cancelFunc,
    modal_basic_info: ownProps.modal_basic_info,
    user_view_reducer: state.user_view_reducer,
    freelancerProfile: state.freelancerProfile,
    avatarReducer: state.avatar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchViewUser: (id) => {
        return dispatch(userActions.fetchViewUser(id))
      },
      update_basic_info: (data) => (dispatch(uActions.submitForm({user: data}))),
      updateCurrentUser: () => (dispatch(userActions.updateCurrentUser())),
  };
}

const wrappedBasicInfoForm = Form.create()(BasicInfoForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedBasicInfoForm);
