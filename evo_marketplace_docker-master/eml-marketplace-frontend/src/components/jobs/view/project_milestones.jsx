import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jmActions from './../../../actions/job_milestones';
import ProjectMilestoneForm from './project_milestone_form';
import moment from 'moment';
import { Button, Modal, Steps } from 'antd';
import Defender from './../../../helpers/defender';
import paid_image from './../../../images/ic_wallet_02.png';
import calender_image from './../../../images/ic_calendar.png';
const Step = Steps.Step;

class ProjectMilestones extends Component {
  state = {
    showProjectMilestoneForm: false,
    modal_milestones: false,
    showEditProjectMilestoneForm: false,
    edit_modal_milestones: false,
    selected_milestone_id: 0,
    selected_milestone_price: 0,
    selected_milestone_description: '',
    selected_milestone_closing_date: ''

  }
  componentWillMount() {
    this.props.fetchJobMilestones(this.props.job_id);
  }

  toggleEditForm(obj_milestone, e) {
    e.preventDefault();
    this.setState({selected_milestone_id: obj_milestone.id});
    this.setState({selected_milestone_description: obj_milestone.description});
    this.setState({selected_milestone_price: obj_milestone.price});
    this.setState({selected_milestone_closing_date: obj_milestone.closing_date});
    this.setState({
      showEditProjectMilestoneForm: !this.state.showEditProjectMilestoneForm,
      edit_modal_milestones: !this.state.edit_modal_milestones,
    });
  }

  toggleForm(e) {
    e.preventDefault();
    this.setState({
      showProjectMilestoneForm: !this.state.showProjectMilestoneForm,
      modal_milestones: !this.state.modal_milestones,
    });
  }

  confirm_close = (milestone, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to close this milestone?',
      content: 'By accepting, you will agree to the Terms & Conditions of Wurker.ai.',
      onOk(){
        let data = {};
        data["is_delivered"] = true;
        that.props.approveMilestone(that.props.job_id, milestone.id, {project_milestone: data});
      },
      onCancel(){

      }
    });
  }

  confirm_approval = (milestone, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to request for approval of this milestone?',
      content: 'By accepting, you will agree to the Terms & Conditions of Wurker.ai.',
      onOk(){
        let data = {};
        data["approval_status"] = "pending";
        that.props.approveMilestone(that.props.job_id, milestone.id, {project_milestone: data});
      },
      onCancel(){

      }
    });
  }

  confirm_accept = (milestone, e) => {
    const that = this;
    Modal.confirm({
      title: 'Do you want to accept this milestone',
      content: 'By accepting, you will agree to the Terms & Conditions of Wurker.ai.',
      onOk(){
        let data = {};
        data["is_accepted"] = true;
        that.props.approveMilestone(that.props.job_id, milestone.id, {project_milestone: data});
      },
      onCancel(){

      }
    });
  }

  custom_click(obj_milestone, e) {
    this.setModalEditMilestone(true);
  }

  render(){
    const { job_milestones } = this.props.job_milestone_reducer;
    const { job, currentUser } = this.props;
    return (
        <React.Fragment>
          <React.Fragment>
            { this.state.showProjectMilestoneForm ? <ProjectMilestoneForm cancelFunc={this.toggleForm.bind(this)} modal_milestones={this.state.modal_milestones} /> : ''}
            { job.user_id === currentUser.id && (job.state === 'active' || job.state === 'invited') ?
              <a onClick={this.toggleForm.bind(this)}>+ Add milestone</a>
            : '' }
          </React.Fragment>
          <div className="milestone-holder">
            <ul>
            {job_milestones.map((milestone, index) => (
              <li key={index}>
                <div className="milestone-item">
                  <h2>
                    <span>Milestone {index + 1}&nbsp;&nbsp;</span>
{/*                    {currentUser._r.includes("client") ?
                      <a className="edit-btn" type="primary" onClick={this.toggleEditForm.bind(this, milestone)}><Icon style={{ color:'#7d7d7d', fontSize:'18px', fontWeight:'400'}} type="edit" /></a>
                    : "" }*/}
                  </h2>
                  <p>{milestone.description}</p>
                  <div className="mobile-escrow-btn">
                      <React.Fragment>
                       { ((job.user_id === currentUser.id && currentUser._r.includes("client")) || (milestone.user_id === currentUser.id && currentUser._r.includes("freelancer")))  && milestone.state === null ?
                        <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to agree to the milestone</Button>
                        : ""
                        }
                      </React.Fragment>
                      <React.Fragment>
                       { job.user_id === currentUser.id && milestone.state === 'agree' && currentUser._r.includes("client") ?
                        <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to complete payment</Button>
                        : ""
                        }
                      </React.Fragment>
                      <React.Fragment>
                       { job.user_id === currentUser.id && milestone.state === 'receive' && currentUser._r.includes("client") ?
                        <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to accept the milestone</Button>
                        : ""
                        }
                      </React.Fragment>
                      <React.Fragment>
                       { job.user_id === currentUser.id && milestone.state === 'ship' && currentUser._r.includes("client") ?
                        <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to receive the milestone</Button>
                        : ""
                        }
                      </React.Fragment>
                      <React.Fragment>
                       { milestone.state === 'payment_approved' && currentUser._r.includes("freelancer") && milestone.user_id === currentUser.id ?
                        <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to deliver the milestone</Button>
                        : ""
                        }
                      </React.Fragment>
                  </div>
                  {milestone.is_delivered === true ?
                    <ul>
                      <li>
                        <img src={paid_image} alt="User img" />
                        <span>${milestone.price.fractional/100}</span>
                      </li>
                      <li>
                        <img src={calender_image} alt="User img" />
                        <span>{ milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
                      </li>
                    </ul>
                    : 
                    <ul>
                      <li>
                        <img src={paid_image} alt="User img" />
                        <span>${milestone.price.fractional/100}</span>
                      </li>
                      <li>
                        <img src={calender_image} alt="User img" />
                        <span>{ milestone.closing_date ? moment(milestone.closing_date).format("DD/MM/YYYY") : '' }</span>
                      </li>
                    </ul>
                    }
                    <br/>
                    <h3>Milestone Instructions</h3>
                    {Defender.currentUser()._r.includes("client") ?
                      <React.Fragment>
                        {milestone.state === null || milestone.state === "create" ?
                          <Steps direction="vertical" size="small" current={0}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "agree" ?
                          <Steps direction="vertical" size="small" current={1}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "payment_approved" ?
                          <Steps direction="vertical" size="small" current={2}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "ship" ?
                          <Steps direction="vertical" size="small" current={3}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "receive" ?
                          <Steps direction="vertical" size="small" current={4}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "accept" ?
                          <Steps direction="vertical" size="small" current={5}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                        {milestone.state === "reject" ?
                          <Steps direction="vertical" size="small" current={4}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Please check your email or click on the button 'Go to Escow.com to complete payment' to fund the milestone." />
                            <Step title="Freelancer delivers the milestone" description="Freelancer will click on 'Delivered' on Escrow.com to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Please check your email or click on the button 'Go to Escow.com to receive the milestone' to review and receive the milestone." />
                            <Step title="Escow.com pays to the freelancer" description="Please check your email or click on the button 'Go to Escow.com to accept the milestone' so Escrow.com pays to the freelancer" />
                          </Steps>
                        : "" }
                      </React.Fragment>
                    : 
                      <React.Fragment>
                        {milestone.state === null || milestone.state === "create" ?
                          <Steps direction="vertical" size="small" current={0}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "agree" ?
                          <Steps direction="vertical" size="small" current={1}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "payment_approved" ?
                          <Steps direction="vertical" size="small" current={2}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "ship" ?
                          <Steps direction="vertical" size="small" current={3}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "receive" ?
                          <Steps direction="vertical" size="small" current={4}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "accept" ?
                          <Steps direction="vertical" size="small" current={5}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                        {milestone.state === "reject" ?
                          <Steps direction="vertical" size="small" curent={4}>
                            <Step title="Freelancer and client agree to terms on Escrow.com" description="Please check your email or click on the button 'Please check your email and agree to terms on Escrow.com' to agree to the milestone on Escrow.com." />
                            <Step title="Client sends payment to Escrow.com" description="Client goes to Escrow.com and submits a payment. It is advised that do not start the work untill client funds the milestone" />
                            <Step title="Freelancer delivers the milestone" description="Please check your email or click on the button 'Go to Escrow.com to deliver the milestone' to deliver the milestone." />
                            <Step title="Client receives the milestone items" description="Client goes to Escrow.com and receives the milestone to review the work" />
                            <Step title="Escow.com pays to the freelancer" description="Escrow.com pays to the freelancer once client accepts the milestone" />
                          </Steps>
                        : "" }
                      </React.Fragment>
                    }
                </div>
                <React.Fragment>
                 { ((job.user_id === currentUser.id && currentUser._r.includes("client")) || (milestone.user_id === currentUser.id && currentUser._r.includes("freelancer")))  && milestone.state === null ?
                  <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to agree to the milestone</Button>
                  : ""
                  }
                </React.Fragment>
                <React.Fragment>
                 { job.user_id === currentUser.id && milestone.state === 'agree' && currentUser._r.includes("client") ?
                  <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to complete payment</Button>
                  : ""
                  }
                </React.Fragment>
                <React.Fragment>
                 { job.user_id === currentUser.id && milestone.state === 'receive' && currentUser._r.includes("client") ?
                  <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to accept the milestone</Button>
                  : ""
                  }
                </React.Fragment>
                <React.Fragment>
                 { job.user_id === currentUser.id && milestone.state === 'ship' && currentUser._r.includes("client") ?
                  <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to receive the milestone</Button>
                  : ""
                  }
                </React.Fragment>
                <React.Fragment>
                 { milestone.state === 'payment_approved' && currentUser._r.includes("freelancer") && milestone.user_id === currentUser.id ?
                  <Button className="escrow-payment-btn outline-btn" type="primary" size="large" target="_blank" href={"https://my.escrow.com/myescrow/MyTransactions.asp?TID="+ milestone.escrow_transaction_id}>Go to Escrow.com to deliver the milestone</Button>
                  : ""
                  }
                </React.Fragment>
              </li>
              ))}
            </ul>
              {/*{ this.state.showEditProjectMilestoneForm ? <EditProjectMilestoneForm cancelFunc={this.toggleEditForm.bind(this)} edit_modal_milestones={this.state.edit_modal_milestones} milestone_id={this.state.selected_milestone_id} milestone_price={this.state.selected_milestone_price} milestone_description={this.state.selected_milestone_description} milestone_closing_date={this.state.selected_milestone_closing_date} job_id={job.id} /> : ''}*/}
          </div>
        </React.Fragment>
    );
  }
}


function mapStateToProps(state, ownProps){
  return {
    job_milestone_reducer: state.job_milestones_reducer,
    job_id: ownProps.job.id,
    job: ownProps.job,
    currentUser: state.auth.currentUser,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    fetchJobMilestones: (job_id) => (dispatch(jmActions.fetch(job_id))),
    approveMilestone: (job_id, milestone_id, data) => (dispatch(jmActions.update(job_id, milestone_id, data))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMilestones);
