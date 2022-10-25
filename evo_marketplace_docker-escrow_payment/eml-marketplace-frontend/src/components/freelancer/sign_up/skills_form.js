import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Tag, Select, AutoComplete } from 'antd';
import * as sActions from './../../../actions/skills';

const FormItem = Form.Item;
const Option = Select.Option;

class SkillsForm extends Component {

  state = {
    confirmDirty: false,
    skillsList: [],
    dataSource: [],
    searchTxt: '',
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.confirmDirty || !!value
    })
  }
  componentDidMount() {
    this.props.setCurrentForm({ currentObject: this });
  }
  componentWillMount() {
    this.props.fetchAllSkills();
  }
  onSelect = (value) => {
    let { skillsList } = this.state;
    const filteredValue = value.replace('Add New ', '')
    if (!skillsList.includes(filteredValue)) {
      skillsList.push(filteredValue);
      this.setState({
        skillsList: skillsList,
        dataSource: []
      });
    }
    setTimeout(
      function() {
        this.setState({
          searchTxt: '',
          dataSource: []
        })
      }.bind(this),
      100
    )
  }
  fillDataSource = (value) => {
    const { skills } = this.props.skills_reducer;
    const { skillsList } = this.state;
    let dataSource = skills;
    if (value)
      dataSource = dataSource.filter(({id, name}) => name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    return dataSource.map(({name}) => name).filter((name) => !skillsList.includes(name));
  }
  onSearch = (value) => {
    let tags = this.fillDataSource(value);
    if (!tags.length) {
      tags.push(`Add New ${value}`)
    }
    return this.setState({
      dataSource: tags,
      searchTxt: value
    });
  }

  countSkillsValidation = (rule, value, callback) => {
    //const { form } = this.props;
    if (this.state.skillsList.length <= 3) {
      callback('Select atleast 3 skills to continue');
    } else {
      callback();
    }
  }
  changeTxt = (value) => {
    this.setState({
      searchTxt: value
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
		const { dataSource, searchTxt } = this.state;
		//const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
    //const { skills } = this.props.skills_reducer;
    const children = ((value) => (<Option key={value} text={value}>{value}</Option>));

    return (
      <div className="freelancer-signup-form-holder skills-block">
        <div className="freelancer-signup-heading">
          <h2>Join The Team</h2>
          <h3>2 - Skills</h3>
        </div>
        <div className="freelancer-signup-body">
          <Form onSubmit={this.handleSubmit}>
            <div className="freelancer-signup-form-row">
              <FormItem label="Enter your skills">
                 { getFieldDecorator('skills_list')(
                  <div className="autocomplete_field">
                      <span>Enter you skills carefully, You will be interviewed and evaluated based on the skills you enter here.</span>
                      <AutoComplete
                          style={{ width: '100%', height:'40px' }}
                          onSelect={this.onSelect}
                          placeholder="Search Skills"
                          dataSource={dataSource.map(children)}
                          onSearch={this.onSearch}
                          value={searchTxt}
                          onChange={this.changeTxt}
                          >
                      </AutoComplete>
                  </div>
                 )}
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <div className="default-tags-list">
                { this.state.skillsList.map((val, index) =>
                  <Tag closable color="#1890ff" style={{
                    fontSize: '14px', fontWeight: '400', height: 'auto', padding: '3px 10px 4px' }} key={index}>
                    {val}
                  </Tag>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    skills_reducer: state.skills_reducer,
  }
}

function mapFunctionToDispatch(dispatch) {
  return {
    fetchAllSkills: () => (dispatch(sActions.fetch()))
  }
}

const wrappedSkillsForm = Form.create()(SkillsForm);
export default connect(mapStateToProps, mapFunctionToDispatch)(wrappedSkillsForm);
