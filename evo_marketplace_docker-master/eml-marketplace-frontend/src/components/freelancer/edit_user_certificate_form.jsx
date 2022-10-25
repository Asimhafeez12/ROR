import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal, DatePicker } from 'antd';
import * as ucActions from './../../actions/users/user_certificates';
import Defender from './../../helpers/defender';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;


class EditUserCertificateForm extends Component {
  state = {
    confirmDirty: false,
    modal_edit_certificates: this.props.modal_edit_certificates
  }

  handleCancelUserCertificate(e){
    e.preventDefault();
    this.setState({ modal_edit_certificates: false });
  }


  setModalEditCertificates(modal_edit_certificates) {
    this.setState({ modal_edit_certificates });
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
            this.props.updateCertificate(this.props.user_certificate.id, data);
          this.props.fetchUserCertificates(Defender.currentUser().id);
          this.setState({
            modal_edit_certificates: false,
          });
        }
    else {
          // this.props.fetchUserCertificates(Defender.currentUser().id);
          // this.setState({
          //   modal_edit_certificates: false,
          // });
    }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {cancelFunc, user_certificate} = this.props;
    
    return (
      <React.Fragment>      
          <Modal
            title="Edit Certificate"
            centered
            visible={this.state.modal_edit_certificates}
            onOk={() => this.setModalEditCertificates(false)}
            onCancel={() => cancelFunc()}
            footer={[
            <Form key={3} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="certificate-title">
                  {getFieldDecorator('certificate_title',{
                    initialValue: user_certificate.title,
                    rules: [{ required: true, message: 'Please Enter Certificate Title ' }, {max: 100, message: 'Please enter less text for certificate title'}],
                  })(
                  <Input size="large" placeholder="Certificate Title" />
                  )}
              </FormItem>
                <FormItem className="certificate-name">
                  {getFieldDecorator('certificate_institution_name', {
                    initialValue: user_certificate.institution_name,
                    rules: [{ required: true, message: 'Please Enter Institute Name' }, {max: 100, message: 'Please enter less text for institution name'}],
                    })(<Input size="large" placeholder="Institution Name" />)
                  }
                </FormItem>
                <FormItem className="certificate-start-date">
                  {getFieldDecorator('certificate_starting_date',{
                    rules: [{ required: true, message: 'Please Select Date' }],
                    initialValue: moment(user_certificate.starting_date)
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
                    initialValue: moment(user_certificate.ending_date)
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
                    initialValue: user_certificate.description,
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
    toggleEditUserCertificateForm: ownProps.cancelFunc,
    modal_edit_certificates: ownProps.modal_edit_certificates,
    user_certificates_reducer: state.user_certificates_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserCertificates: (user_id) => {
      dispatch(ucActions.fetch(user_id))
    },

     updateCertificate: (user_certificate_id, data) => (dispatch(ucActions.update(user_certificate_id, data)))
  };
}

const wrappedEditUserCertificateForm = Form.create()(EditUserCertificateForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEditUserCertificateForm);
