import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker } from 'antd';
import * as ucActions from './../../actions/users/user_certificates';
import Defender from './../../helpers/defender';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;


class UserCertificateForm extends Component {
  state = {
    confirmDirty: false,
    modal_certificates: this.props.modal_certificates
  }

  handleCancelUserCertificate(e){
    e.preventDefault();
    this.setState({ modal_certificates: false });
  }

  setModalCertificates(modal_certificates) {
    this.setState({ modal_certificates });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            data["title"] = values.certificate_title;
            data["starting_date"] = values.certificate_starting_date;
            data["ending_date"] = values.certificate_ending_date;
            data["institution_name"] = values.certificate_institution_name;
            data["description"] = values.certificate_description;
          this.props.addCertificate({user_certificate: data});
          this.props.fetchUserCertificates(Defender.currentUser().id);
          this.setState({
            modal_certificates: false,
          });
        }
    else {
          // this.props.fetchUserCertificates(Defender.currentUser().id);
          // this.setState({
          //   modal_certificates: false,
          // });
    }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>      
          <Modal
            title="Add Certificates"
            centered
            visible={this.state.modal_certificates}
            onOk={() => this.setModalCertificates(false)}
            onCancel={() => this.setModalCertificates(false)}
            footer={[
            <Form key={3} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="certificate-title">
                  {getFieldDecorator('certificate_title',{
                    rules: [{ required: true, message: 'Please Enter Certificate Title ' }, {max: 100, message: 'Please enter less text for certificate title'}],
                  })(
                  <Input size="large" placeholder="Certificate Title" />
                  )}
              </FormItem>
                <FormItem className="certificate-name">
                  {getFieldDecorator('certificate_institution_name', {
                    rules: [{ required: true, message: 'Please Enter Institute Name' }, {max: 100, message: 'Please enter less text for institution name'}],
                    })(<Input size="large" placeholder="Institution Name" />)
                  }
                </FormItem>
                <FormItem className="certificate-start-date">
                  {getFieldDecorator('certificate_starting_date',{
                    rules: [{ required: true, message: 'Please Select Date' }],
                    initialValue: moment(),
                  })(
                  <DatePicker
                    size="large"
                    style={{width:'100%', fontSize:'14px'}}
                    disabledDate={this.disabledStartDate}
                    placeholder="Start Date"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                  )}
                </FormItem>
                <FormItem className="certificate-end-date">
                  {getFieldDecorator('certificate_ending_date',{
                    rules: [{ required: true, message: 'Please Select Date' }],
                    initialValue: moment(),
                  })(
                  <DatePicker
                    size="large"
                    style={{width:'100%', fontSize:'14px'}}
                    disabledDate={this.disabledStartDate}
                    placeholder="End Date"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                  )}
                </FormItem>
              <FormItem>
                {
                  getFieldDecorator('certificate_description', {
                    rules: [{ required: true, message: 'Please Enter Description' }, {max: 500, message: 'Please enter less text for description'}],
                    })(<TextArea placeholder="Add Details" autosize={{ minRows: 6, maxRows: 6 }} id= "certificate_description" placeholder="Write a small description about what you have learned, what topics were covered etc" />)
                }
              </FormItem>
              <Button key="back" onClick={this.handleCancelUserCertificate.bind(this)}>Cancel</Button>
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
    toggleUserCertificateForm: ownProps.cancelFunc,
    modal_certificates: ownProps.modal_certificates,
    user_view_reducer: state.user_view_reducer,
    user_certificates_reducer: state.user_certificates_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
     addCertificate: (data) => (dispatch(ucActions.add(data))),

    fetchUserCertificates: (user_id) => {
      dispatch(ucActions.fetch(user_id))
    }
  };
}

const wrappedUserCertificateForm = Form.create()(UserCertificateForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserCertificateForm);