import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Radio, Modal } from 'antd';
import * as afActions from './../../actions/accepted_freelancers';
import paypalLogo from '../../images/paypal-logo.png';
import ic_shield from '../../images/ic_shield.png';

const RadioGroup = Radio.Group;



class PaymentForm extends Component {
  state = {
    confirmDirty: false,
    modal_payment_form: this.props.modal_payment_form,
    value: 1
  }

  acceptFreelancer = (obj_user, obj_job, e) => {
      const value = []; value.push(obj_user.id);
      const values = value.map((val) => ( {user_id: val}));
        this.props.acceptFreelancers(obj_job.id, {job: {state_event: "active", accept_freelancers_attributes: values}}).then((res) => {
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

  confirm = (obj_user, obj_job, e) => {
    this.setModalPayment(false)
    const that = this;
    Modal.confirm({
      title: 'You have Successfully hired ' + obj_user.full_name,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      onOk(){
        that.acceptFreelancer(obj_user, obj_job)
      }
    });
  }


  handleOk = (e) => {
    this.setPopupShow(false)
    this.setBillingPopupShow(false)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            //let  data = {}
            //data["title"] = values.certificate_title;
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
    //const { getFieldDecorator } = this.props.form;
    return (
      <div>
            <Modal
              title="Add Billing Method"
              className="escrow-popup billing-popup"
              centered
              width="730px"
              visible={this.state.modal_payment_form}
              onOk={() => this.setModalPayment(false)}
              onCancel={() => this.setModalPayment(false)}
              footer={[
                <Button key="cancel2" onClick={this.handleCancelPaymentForm.bind(this)}>Cancel</Button>,
                <Button type="primary" loading={this.state.loading} onClick={this.confirm.bind(this, user, job)}>Save and Pay</Button>
              ]}
              >
              <RadioGroup className="custom-radio-group" onChange={this.onChange} value={this.state.value}>
                <Radio className="radio-holder" value={1}>
                  <div className="default-logo-holder"><img src={paypalLogo} alt="Default User Card" /></div>
                  <ul className="default-card-holder">
                    <li><span>****</span></li>
                    <li><span>****</span></li>
                    <li><span>****</span></li>
                    <li><span>4913</span></li>
                  </ul>
                </Radio>
                <Radio className="radio-holder" value={2}>Credit or Debit Card
                {
                  this.state.value === 2?
                    <Form key={1} className="payment-popup-form" onSubmit={this.handleSubmit}>
                      <div className="payment-popup-form-row">
                        <label className="required-field">Card Number</label>
                        <Input className="card-number-imput" prefix={<Icon style={{ color:'#bbb' }} type="credit-card" theme="filled" />} suffix={ <div className="payment_logo"><img src={ic_shield} alt="Payment Logo" /><span>Your card is saved securely</span></div> } type="text" />
                      </div>

                      <div className="payment-popup-form-row">
                        <div className="security-form-columns">
                          <label className="required-field">First Name</label>
                          <Input type="text" />
                        </div>
                        <div className="security-form-columns">
                          <label className="required-field">Last Name</label>
                          <Input type="text" />
                        </div>
                      </div>

                      <div className="payment-popup-form-row">
                        <div className="security-form-columns">
                          <label className="required-field">Expiry</label>
                          <div className="low-width">
                            <Input type="text" placeholder="MM" />
                          </div>
                          <div className="low-width">
                            <Input type="text" placeholder="YY" />
                          </div>
                        </div>
                        <div className="security-form-columns">
                          <label className="required-field">CVV</label>
                          <Input type="text" />
                        </div>
                      </div>
                    </Form>
                  :
                    null
                }
                </Radio>
                <Radio className="radio-holder paypal-radio-holder" value={3}>
                  <div className="paypal-logo-holder"><img src={paypalLogo} alt="Paypal Logo" /></div>
                </Radio>
              </RadioGroup>
              {
                this.state.value === 3?
                  <div className="paypal-holder">
                    <p>You 'll be redirected to paypal to link a verified account.</p>

                    <Button type="primary" loading={this.state.loading} onClick={this.handleOk}>Pay with PayPal</Button>
                  </div>              
                :
                  null
              }
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

    acceptFreelancers: (job_id, data) => {
      return dispatch(afActions.acceptFreelancers(job_id, data))
    },
  };
}

const wrappedPaymentForm = Form.create()(PaymentForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedPaymentForm);
