import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as jbActions from './../../../actions/job_bonus';

const { TextArea } = Input;
const FormItem = Form.Item;

class BonusForm extends Component {
  state = {
    confirmDirty: false,
    modal_bonus: this.props.modal_bonus
  }

  setModalBonus(modal_bonus) {
    this.setState({ modal_bonus });
  }

  handleCancelBonus(e){
    e.preventDefault();
    this.setState({ modal_bonus: false });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {job } = this.props;
      let  data = {}
      data["bonus_amount"] = values.bonus_amount;
      data["bonus_description"] = values.bonus_description;
      data["user_id"] = job.accepted_freelancer_id;
      this.props.give_bonus(job.id, data);
          this.setState({
            modal_bonus: false,
          });
      });
    };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
          <Modal
            title="Give Bonus or expense reimbursement"
            centered
            visible={this.state.modal_bonus}
            onOk={() => this.setModalBonus(false)}
            onCancel={() => this.setModalBonus(false)}
            footer={[
            <Form key={1} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem className="popup-form-title">
                  {getFieldDecorator('bonus_amount',{
                  })(
                  <Input placeholder="Amount" />
                  )}
              </FormItem>
              <FormItem className="popup-form-title">
                  {getFieldDecorator('bonus_description',{
                  })(
                  <TextArea placeholder="Description" />
                  )}
              </FormItem>

              <Button key="back" onClick={this.handleCancelBonus.bind(this)}>Cancel</Button>
                   <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading}>Save</Button>
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
    toggleBasicInfoForm: ownProps.cancelFunc,
    modal_basic_info: ownProps.modal_basic_info,
    job: ownProps.job
  };
}

function mapDispatchToProps(dispatch) {
  return {
      give_bonus: (job_id, data) => (dispatch(jbActions.add(job_id, data))),
  };
}

const wrappedBonusForm = Form.create()(BonusForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedBonusForm);
