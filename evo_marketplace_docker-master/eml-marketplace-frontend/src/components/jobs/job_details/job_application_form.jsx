import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import * as fActions from './../../../actions/dashboard/freelancer';
import Defender from './../../../helpers/defender';
import * as vActions from './../../../actions/jobs/view';

const FormItem = Form.Item;
const { TextArea } = Input;


class JobApplicationForm extends Component {
  state = {
    confirmDirty: false,
    modal_cover_letter: this.props.modal_cover_letter,
    confirmLoading: false,
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

  check_minimum_budget = (rule, value, callback) => {

    //const form = this.props.form;
    if (value && value.indexOf("-") > -1) {
      callback('Please enter amount greater than 100');
    }
    if (value && value.indexOf(".") > -1) {
      callback('Please enter amount greater than 100');
    }
    if (value.length < 3) {
      callback('Please enter amount greater than 100');
    } 
    else {
      callback();
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ confirmLoading: true });

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
          this.setState({ confirmLoading: false });
          window.location = "/freelancer";
          if (!this.props.freelancer_dashboard_reducer.success) {
            this.props.fetchViewJob(window.location.href.split('/')[4]);
            this.setState({ confirmLoading: false });
            window.location = "/freelancer";
          }
        });
      } else {
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.props;
    const { confirmLoading } = this.state;
    return (
      <div>
          <Modal
            centered
            className="apply-job-popup-holder"
            width='720px'
            confirmLoading={confirmLoading}
            visible={this.state.modal_cover_letter}
            onOk={() => this.setModalCoverLetter(false)}
            onCancel={() => this.setModalCoverLetter(false)}
            footer={[
            <Form key={5} className="freelancer-job-detail-form" onSubmit={this.handleSubmit}>
              <div className="job-detail-form-row">
                    <FormItem label="Proposed Budget">
                    {getFieldDecorator('expected_amount',{
                        rules: [{
                            required: true, message: 'Please enter estimated budger in $'
                        },{ validator: this.check_minimum_budget } ]
                    })(
                    <Input type="number" addonBefore="$" placeholder="Minimum posted budget should be more then $100" />
                    )}
                    </FormItem>
              </div>
              <div className="job-detail-form-row">
                    <FormItem label="Estimated Completion Duration">
                    {getFieldDecorator('expected_timeline',{
                        rules: [{
                            required: true, message: 'Please enter estimated time in number of weeks'
                        }, {message: 'Please input numbers' }]
                    })(
                      <Input type="number" addonBefore="Week" />
                    )}
                    </FormItem>
              </div>
              <div className="job-detail-form-row">
                    <FormItem label="Cover Letter">
                    {getFieldDecorator('cover_letter',{
                        rules: [{
                            required: true, message: 'Please fill job cover letter'
                        }, {max: 1500, message: 'Please enter less text for cover letter'}]
                    })(
                      <TextArea rows={4} />
                    )}
                    </FormItem>
              </div>
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>
              <Button key="submit" type="primary" htmlType="submit" onClick={this.handleOk} loading={confirmLoading}>Apply</Button>
            </Form>
            ]}
          >
{/*            <div className="popup-image-holder">
              <img src={apply_popup_image} alt="Apply Popup | Wurker.ai - Connecting Top AI talent with Cool Companies" />
            </div>*/}
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
