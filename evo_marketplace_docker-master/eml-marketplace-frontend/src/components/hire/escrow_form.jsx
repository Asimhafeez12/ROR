import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal } from 'antd';
import * as hActions from './../../actions/update_job';
import * as uActions from './../../actions/users';
import * as ofActions from './../../actions/opted_freelancers';
import PaymentForm from './payment_form';
import * as jmcActions from './../../actions/job_milestones';

class EscrowForm extends Component {
  state = {
    confirmDirty: false,
    modal_escrow_form: this.props.modal_escrow_form,
    modal_payment_form: this.props.modal_payment_form,
    showPaymentForm: false,
    confirmLoading: false
  }

  componentWillMount() {
    //this.props.fetchJobMilestones(this.props.job.id);
  }

  handleCancelEscrowForm(e){
    e.preventDefault();
    this.setState({ modal_escrow_form: false });
  }

  setModalEscrow(modal_escrow_form) {
    this.setState({ modal_escrow_form });
  }

  setModalPayment(modal_payment_form) {
    this.setState({ modal_payment_form });
  }

  optFreelancer = (obj_user, obj_job, e) => {
      this.setState({ confirmLoading: true });
      const value = []; value.push(obj_user.id);
      const values = value.map((val) => ( {user_id: val}));
      const that = this;
      if ((that.props.milestone_description !== "" && that.props.milestone_price !== "" && that.props.milestone_closing_date !== null && that.props.job_type === 2)  ){
          let data_milestone= {}
          data_milestone["title"] = "Milestone 1"
          data_milestone["user_id"] = window.location.href.split('/')[6];
          data_milestone["is_accepted"] = false;
          data_milestone["description"] = that.props.milestone_description;
          data_milestone["price"] = that.props.milestone_price;
          data_milestone["closing_date"] = that.props.milestone_closing_date;
          that.props.addMilestone(obj_job.id, {project_milestone: data_milestone});
        }
        if (that.props.job_type === 1){
          let  data = {}
          data["job_type"] = "full";
          data["milestone_user_id"] = window.location.href.split('/')[6];
          data["milestone_title"] = "Milestone 1"
          this.props.save(obj_job.id, data);
        }
        that.props.optFreelancers(obj_job.id, {job: {state_event: "invited", opted_freelancers_attributes: values}}).then((res) => {
          this.setState({ confirmLoading: false });
          window.location = '/job/' + obj_job.id;
        });
  }

  togglePaymentForm(e) {
      e.preventDefault();
      this.setModalEscrow(false);
      this.setState({
        showPaymentForm: !this.state.showPaymentForm,
        modal_payment_form: !this.state.modal_payment_form,
      });

    this.setState({ confirmLoading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      debugger
      if (!err) {
        let  data = {}
        if (values.escrow_knowledge === true){
          this.props.update_info(data);
          this.setState({ confirmLoading: false });
        }
      }
    });
  }

  render() {
    const { job } = this.props;
    const { user } = this.props;
    const { job_milestones } = this.props.job_milestone_reducer;
    const { confirmLoading } = this.state;
    return (
      <div>
          <Modal
            title="Depositing funds into escrow"
            className="escrow-popup"
            centered
            confirmLoading={confirmLoading}
            width="730px"
            visible={this.state.modal_escrow_form}
            onOk={() => this.setModalEscrow(false)}
            onCancel={() => this.setModalEscrow(false)}
            footer={[
              <Form key={3}>
                <p>By proceeding, you will now receive an Email from Escrow.com prompting you to deposit the amount. Payment processing procedure is as follows:</p>
                <p>1. Go to Escrow.com and create an account.</p>
                <p>2. You will begin a transaction and both parties (i.e. Client and Freelancer) will agree to the terms.</p>
                <p>3. You will submit a payment by approved payment method to your secure Escrow Account, Escrow.com verifies the payment, the freelancer will be notified that funds have been secured 'In Escrow'.</p>
                <p>4. Upon payment verification, the freelancer can start working and submit the deliverables.</p>
                <p>5. Once you are satisfied with the work of freelancer, you will approve the milestone and accept the transaction on escrow.com.</p>
                <p>6. Escrow.com will transfer the funds to freelancer’s account.</p>
{/*                {getFieldDecorator('escrow_knowledge',{
                })(
                <Checkbox>Don't show this again, I know how Escrow payments work.</Checkbox>
                )}*/}
                <div className="escrow-buttons-holder">
                    <Button key="cancel" onClick={this.handleCancelEscrowForm.bind(this)}>Cancel</Button>
                    { this.state.showPaymentForm ? <PaymentForm cancelFunction={this.togglePaymentForm.bind(this)} modal_payment_form={this.state.modal_payment_form} user={user} job={job} /> : ''}
                    {job_milestones && job_milestones.length === 0 ?
                      <Button type="primary" onClick={this.optFreelancer.bind(this, user, job)} loading={confirmLoading} >Proceed</Button>
                    : <Button type="primary" onClick={this.optFreelancer.bind(this, user, job)} loading={confirmLoading}>Proceed</Button> }
                </div>
              </Form>
            ]}
            >
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleEscrowForm: ownProps.cancelFunc,
    modal_escrow_form: ownProps.modal_escrow_form,
    modal_payment_form: ownProps.modal_payment_form,
    job: ownProps.job,
    user: ownProps.user,
    milestone_description: ownProps.milestone_description,
    milestone_price: ownProps.milestone_price,
    milestone_closing_date: ownProps.milestone_closing_date,
    job_type: ownProps.job_type,
    job_milestone_reducer: state.job_milestones_reducer,
    user_view_reducer: state.user_view_reducer,
    jobUpdateReducer: state.update_job_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update_info: (data) => (dispatch(uActions.update(data))),
    optFreelancers: (job_id, data) => {
      return dispatch(ofActions.optFreelancers(job_id, data))
    },
    addMilestone: (job_id, data) => (dispatch(jmcActions.add(job_id, data))),
    save: (job_id, data) => (dispatch(hActions.submitForm(job_id, {job: data})))
  };
}

const wrappedEscrowForm = Form.create()(EscrowForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEscrowForm);
