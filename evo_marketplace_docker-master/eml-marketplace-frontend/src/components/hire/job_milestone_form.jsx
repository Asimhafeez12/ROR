import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker } from 'antd';
import * as jmActions from './../../actions/job_milestones';
import Defender from './../../helpers/defender';
import moment from 'moment';

const FormItem = Form.Item;

class JobMilestoneForm extends Component {
  state = {
    confirmDirty: false,
    description_value: '',
    price_value: '',
    confirmLoading: false,
    job: this.props.job,
  }
  componentWillMount() {
  }

  handleSubmit = (e) => {
    //const that = e;
    e.preventDefault();
    this.setState({ confirmLoading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values["user_id"] = window.location.href.split('/')[6];
        values["is_accepted"] = false;
        this.props.addMilestone(window.location.href.split('/')[4], {project_milestone: values});
        this.setState({confirmLoading: false})
      }
    });
    this.props.form.resetFields();
    this.setState({confirmLoading: false})
  }

  disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day').add(2, 'days');
  }
  

  onChange = (val, e) => {
    this.props.form.setFieldsValue({
      user_id: val
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { job } = this.state;
    const { TextArea } = Input;
    const { confirmLoading } = this.state;

    return (
      <React.Fragment>
          { job.user_id === Defender.currentUser().id && job.milestones_count < 1  ?
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
                          }, {min: 3, message: 'Please enter amount greater than 100 in $'}]
                      })(<Input addonBefore="$" max={job.minimum_budget} id="price" />)}
                    </FormItem>
                </div>
                <div className="milestone-column">
                  <FormItem label="Expected Date">

                    {getFieldDecorator('closing_date',{
                      initialValue: moment().endOf('day').add(2, 'days')
                    }
                     )(<DatePicker disabledDate={this.disabledDate}/>)}
                  </FormItem>
                </div>
            </div>
            <div className="milestone-row button-holder">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={confirmLoading}>Add</Button>
                </Form.Item>
            </div>
          </Form>
          : "" }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    toggleForm: ownProps.cancelFunc,
    job: ownProps.job
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMilestone: (job_id, data) => (dispatch(jmActions.add(job_id, data))),
  };
}

const wrappedJobMilestoneForm = Form.create()(JobMilestoneForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedJobMilestoneForm);
