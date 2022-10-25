import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker } from 'antd';
import * as jmActions from './../../actions/job_milestones';
import Defender from './../../helpers/defender';

const FormItem = Form.Item;

class JobMilestoneForm extends Component {
  state = {
    confirmDirty: false,
    description_value: '',
    price_value: ''
  }
  componentWillMount() {
    //this.props.fetchInvitedFreelancers(window.location.href.split('/')[4]);
  }

  handleSubmit = (e) => {
    const that = e;
    e.preventDefault();
    const { job } = this.props.view_job_reducer;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        that.target.elements[0].value = "";
        that.target.elements[1].value = "";
        that.target.elements[2].value = "";
        values["user_id"] = window.location.href.split('/')[6];
        this.props.addMilestone(job.id, {project_milestone: values});
      }
    });
    this.props.form.resetFields();
  }

  onChange = (val, e) => {
    this.props.form.setFieldsValue({
      user_id: val
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //const { accepted_freelancers } = this.props.accepted_freelancers_reducer;
    //const { invited_freelancers } = this.props.invited_freelancers_reducer;
    const { job } = this.props.view_job_reducer;
    const { TextArea } = Input;

    return (
      <React.Fragment>
       <Form className="milestones-form" id="milestone_form" onSubmit={this.handleSubmit}>
          <h2>Create Milestones :</h2>
          <div className="milestone-row">
              <FormItem label="Milestones Descriptions">
                {getFieldDecorator('description', {
                  initialValue: this.state.description_value,
                  rules: [{
                    required: true, message: 'Please enter description'
                  }]
                })(<TextArea autosize={{ minRows: 3, maxRows: 3 }} id="description" />)}
              </FormItem>
          </div>
          <div className="milestone-row">
              <div className="milestone-column">
                  <FormItem label="Deposit Amount">
                    {getFieldDecorator('price', {
                      initialValue: this.state.price_value,
                      rules: [{
                          required: true, message: 'Please enter desposit amount'
                        }]
                    })(<Input addonBefore="$" min={0} max={job.minimum_budget} id="price" />)}
                  </FormItem>
              </div>
              <div className="milestone-column">
                <FormItem label="Expected Date">

                  {getFieldDecorator('closing_date',{
                  }
                   )(<DatePicker />)}
                </FormItem>
              </div>
          </div>
          <div className="milestone-row button-holder">
              { job.user_id === Defender.currentUser().id ?
              <Form.Item>
                <Button type="primary" htmlType="submit">Add</Button>
              </Form.Item>
              : "" }
          </div>
       </Form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    //accepted_freelancers_reducer: state.accepted_freelancers_reducer,
    view_job_reducer: state.job_view_reducer,
    toggleForm: ownProps.cancelFunc,
    //invited_freelancers_reducer: state.invited_freelancers_reducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMilestone: (job_id, data) => (dispatch(jmActions.add(job_id, data))),
    // fetchInvitedFreelancers: (id) => {
    //   return dispatch(vActions.fetchFreelancers(id))
    // }
  };
}

const wrappedJobMilestoneForm = Form.create()(JobMilestoneForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobMilestoneForm);
