import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal } from 'antd';
import * as ofActions from './../../actions/opted_freelancers';
//import paypalLogo from '../../images/paypal-logo.png';
//import ic_shield from '../../images/ic_shield.png';

//const RadioGroup = Radio.Group;



class PaymentForm extends Component {
  state = {
    confirmDirty: false,
    modal_payment_form: this.props.modal_payment_form,
    value: 1,
    confirmLoading: false,
  }

  optFreelancer = (obj_user, obj_job, e) => {
      this.setState({ confirmLoading: true });
      const value = []; value.push(obj_user.id);
      const values = value.map((val) => ( {user_id: val}));
        this.props.optFreelancers(obj_job.id, {job: {state_event: "invited", opted_freelancers_attributes: values}}).then((res) => {
          this.setState({ confirmLoading: false });
          window.location = '/job/' + obj_job.id;
        });
  }

  onChange = (e) => {
   this.setState({
     value: e.target.value,
   });
  }

  handleCancelPaymentForm(e){
    e.preventDefault();
    this.setState({ modal_payment_form: false });
  }

  setModalPayment(modal_payment_form) {
    this.setState({ modal_payment_form });
  }


  handleOk = (e) => {
    this.setPopupShow(false)
    this.setBillingPopupShow(false)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.setState({
            modal_payment_form: false,
          });
        }
    else {
          this.setState({
            modal_payment_form: false,
          });
    }
    });
  }

  render() {
    const { user } = this.props;
    const { job } = this.props;
    const { confirmLoading } = this.state;
    return (
      <div>
            <Modal
              title="Your job offfer is being sent to the freelancer"
              className="escrow-popup billing-popup"
              centered
              confirmLoading={confirmLoading}
              width="730px"
              visible={this.state.modal_payment_form}
              onOk={() => this.setModalPayment(false)}
              onCancel={() => this.setModalPayment(false)}
              footer={[
                <Button key="cancel2" onClick={this.handleCancelPaymentForm.bind(this)}>Cancel</Button>,
                <Button type="primary" loading={this.state.loading} onClick={this.optFreelancer.bind(this, user, job)}>Send Job Offer</Button>
              ]}
              >
              <React.Fragment>
                <h2>Your Job Offer is being sent to the freelancer</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </React.Fragment>
            </Modal>  
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleEscrowForm: ownProps.cancelFunction,
    modal_payment_form: ownProps.modal_payment_form,
    user: ownProps.user,
    job: ownProps.job,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    optFreelancers: (job_id, data) => {
      return dispatch(ofActions.optFreelancers(job_id, data))
    },
  };
}

const wrappedPaymentForm = Form.create()(PaymentForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedPaymentForm);
