import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as rfActions from './../../../actions/reject_freelancers';
import * as vActions from './../../../actions/jobs/view';

const FormItem = Form.Item;
const { TextArea } = Input;


class JobRejectionForm extends Component {
  state = {
    confirmDirty: false,
    modal_job_reject: this.props.modal_job_reject,
    confirmLoading: false,
  }


  setModalJobReject(modal_job_reject) {
    this.setState({ modal_job_reject });
  }

  handleCancel = (e) => {
    this.setModalJobReject(false);
  }

  popup_dismissal = (e) => {
    this.setModalJobReject(false);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ confirmLoading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        const { job } = this.props;
        data["state"] = "open";
        data["description"] = values.description;
        this.props.rejectFreelancers(job.id, data).then((res) => {
        this.popup_dismissal();
        window.location = '/freelancer';
        this.setState({confirmLoading: false})
        });
      } else {
        window.location = '/freelancer';
        this.setState({confirmLoading: false})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { job } = this.props;
    const { confirmLoading } = this.state;
    return (
      <div>
          <Modal
            centered
            className="apply-job-popup-holder"
            width='720px'
            confirmLoading={confirmLoading}
            visible={this.state.modal_job_reject}
            onOk={() => this.setModalJobReject(false)}
            onCancel={() => this.setModalJobReject(false)}
            footer={[
            <Form key={5} className="freelancer-job-detail-form" onSubmit={this.handleSubmit}>
              <div className="job-detail-form-row">
                    <FormItem label="Rejection Reason">
                    {getFieldDecorator('description',{
                        rules: [{
                            required: true, message: 'Please enter rejection reason'
                        }, {max: 500, message: 'Please enter less text for rejection reason'}]
                    })(
                      <TextArea rows={4} />
                    )}
                    </FormItem>
              </div>
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>
              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleOk} loading={confirmLoading}>Reject Job</Button>
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
    toggleJobRejectionForm: ownProps.cancelFunc,
    job: ownProps.job,
    modal_job_reject: ownProps.modal_job_reject,
    view_job_reducer: state.job_view_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchViewJob: (id) => {
        return dispatch(vActions.fetchViewJob(id))
      },
      rejectFreelancers: (job_id, data) => {
        return dispatch(rfActions.rejectFreelancers(job_id, {job: data}))
      },
  };
}

const wrappedJobRejectionForm = Form.create()(JobRejectionForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobRejectionForm);
