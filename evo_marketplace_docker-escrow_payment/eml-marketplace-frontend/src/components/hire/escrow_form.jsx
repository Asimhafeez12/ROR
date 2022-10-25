import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, Checkbox } from 'antd';
import * as jmActions from './../../actions/job_milestones';
import * as uActions from './../../actions/users';
import PaymentForm from './payment_form';

class EscrowForm extends Component {
  state = {
    confirmDirty: false,
    modal_escrow_form: this.props.modal_escrow_form,
    modal_payment_form: this.props.modal_payment_form,
    showPaymentForm: false,
  }

  componentWillMount() {
    this.props.fetchJobMilestones(this.props.job.id);
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


  togglePaymentForm(e) {
      e.preventDefault();
      this.setModalEscrow(false);
      this.setState({
        showPaymentForm: !this.state.showPaymentForm,
        modal_payment_form: !this.state.modal_payment_form,
      });

    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            let  data = {}
            if (values.escrow_knowledge === true){
              data["escrow_knowledge"] = values.escrow_knowledge;
              this.props.update_info(data);
            }
        }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.props;
    const { user } = this.props;
    const { job_milestones } = this.props.job_milestone_reducer;
    return (
      <div>
          <Modal
            title="Depositing funds into escrow"
            className="escrow-popup"
            centered
            width="730px"
            visible={this.state.modal_escrow_form}
            onOk={() => this.setModalEscrow(false)}
            onCancel={() => this.setModalEscrow(false)}
            footer={[
              <Form key={3}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                {getFieldDecorator('escrow_knowledge',{
                })(
                <Checkbox>Don't show this again, I know how Escrow payments work.</Checkbox>
                )}
                <div className="escrow-buttons-holder">
                    <Button key="cancel" onClick={this.handleCancelEscrowForm.bind(this)}>Cancel</Button>
                    { this.state.showPaymentForm ? <PaymentForm cancelFunction={this.togglePaymentForm.bind(this)} modal_payment_form={this.state.modal_payment_form} user={user} job={job} /> : ''}
                    {job_milestones && job_milestones.length === 0 ?
                      <Button type="primary" onClick={this.togglePaymentForm.bind(this)}>Yes, Deposit ${job.minimum_budget}</Button>
                    : <Button type="primary" onClick={this.togglePaymentForm.bind(this)}>Yes, Deposit ${job_milestones[0].price_cents/100}</Button> }
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
    job_milestone_reducer: state.job_milestones_reducer,
    user_view_reducer: state.user_view_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),
    update_info: (data) => (dispatch(uActions.update(data))),
  };
}

const wrappedEscrowForm = Form.create()(EscrowForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedEscrowForm);
