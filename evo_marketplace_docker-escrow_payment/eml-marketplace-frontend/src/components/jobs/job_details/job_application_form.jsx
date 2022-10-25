import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as fActions from './../../../actions/dashboard/freelancer';
import Defender from './../../../helpers/defender';
import apply_popup_image from '../../../images/apply-now.gif';
import * as vActions from './../../../actions/jobs/view';

const FormItem = Form.Item;
const { TextArea } = Input;


class JobApplicationForm extends Component {
  state = {
    confirmDirty: false,
    modal_cover_letter: this.props.modal_cover_letter
  }


  setModalCoverLetter(modal_cover_letter) {
    this.setState({ modal_cover_letter });
  }

  handleCancel = (e) => {
    this.setModalCoverLetter(false);
  }

  popup_dismissal = (e) => {
    this.setModalCoverLetter(false);
  }


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let  data = {}
        data["expected_amount"] = values.expected_amount;
        data["expected_timeline"] = values.expected_timeline;
        data["cover_letter"] = values.cover_letter;
        data["user_id"] = Defender.currentUser().id;
        data["job_id"] = this.props.job.id;
        this.props.saveJobCoverLetter(data).then((res) => {
          this.popup_dismissal();
          this.props.fetchViewJob(window.location.href.split('/')[4]);
          window.location = "/";
          if (!this.props.freelancer_dashboard_reducer.success) {
            this.props.fetchViewJob(window.location.href.split('/')[4]);
            window.location = "/";
          }
        });
      } else {
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.props;
    return (
      <div>
          <Modal
            centered
            className="apply-job-popup-holder"
            width='720px'
            visible={this.state.modal_cover_letter}
            onOk={() => this.setModalCoverLetter(false)}
            onCancel={() => this.setModalCoverLetter(false)}
            footer={[
            <Form key={5} className="freelancer-job-detail-form" onSubmit={this.handleSubmit}>
              <div className="job-detail-form-row">
                    <FormItem label="Proposed Budget">
                    {getFieldDecorator('expected_amount',{
                    })(
                    <Input addonBefore="$" placeholder="Minimum posted budget should be more then $100" />
                    )}
                    </FormItem>
              </div>
              <div className="job-detail-form-row">
                    <FormItem label="Estimated Completion Duration">
                    {getFieldDecorator('expected_timeline',{
                    })(
                      <Input addonBefore="Week" />
                    )}
                    </FormItem>
              </div>
              <div className="job-detail-form-row">
                    <FormItem label="Cover Letter">
                    {getFieldDecorator('cover_letter',{
                    })(
                      <TextArea rows={4} />
                    )}
                    </FormItem>
              </div>
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>
              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleOk}>Apply</Button>
            </Form>
            ]}
          >
            <div className="popup-image-holder">
              <img src={apply_popup_image} alt="Apply Popup img" />
            </div>
            <div className="popup-content-holder">
              <h2>{job.title}</h2>
              <ul>
                <li>Category: {job.job_category}</li>
                <li>Max. Budget : ${job.minimum_budget}</li>
              </ul>
            </div>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleJobApplicationForm: ownProps.cancelFunc,
    job: ownProps.job,
    freelancer_dashboard_reducer: state.freelancer_reducer,
    modal_cover_letter: ownProps.modal_cover_letter,
    view_job_reducer: state.job_view_reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
     saveJobCoverLetter: (data) => (dispatch(fActions.create_job_letter({job_cover_letter: data}))),

      fetchViewJob: (id) => {
        return dispatch(vActions.fetchViewJob(id))
      },
  };
}

const wrappedJobApplicationForm = Form.create()(JobApplicationForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobApplicationForm);
