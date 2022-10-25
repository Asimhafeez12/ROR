import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, Tag, AutoComplete, Select, message } from 'antd';
import * as lActions from './../../actions/languages';
import * as ulActions from './../../actions/users/user_languages';
import * as uActions from '../../actions/freelance_profile';
import Defender from './../../helpers/defender';
import * as userActions from './../../actions/users/';

const Option = Select.Option;


class UserLanguageForm extends Component {
  state = {
    confirmDirty: false,
    modal_languages: this.props.modal_languages,
    languagesList: Defender.currentUser().language_list,
    dataSource: [],
    searchTxt: '',
  }

  componentWillMount() {
    this.props.fetchAllLanguages();
  }

  handleCancelUserLanguage(e){
    e.preventDefault();
    this.setState({ modal_languages: false });
  }

  setModalLanguages(modal_languages) {
    this.setState({ modal_languages });
  }


  onSelect = (value) => {
  let { languagesList } = this.state;
  if (languagesList.indexOf(value) === -1){
    var sorted = [];
    const filteredValue = value.replace('Add New ', '');
    for (var i = 0; i < languagesList.length; i++) {
        sorted.push(languagesList[i].toLowerCase());
    }
    sorted.sort();
    if(sorted.indexOf(filteredValue) === -1){
      if (!languagesList.includes(filteredValue)) {
        languagesList.push(filteredValue);
        this.setState({
          languagesList: languagesList,
          dataSource: []
        });
      }
    }
    else{
      message.error("Language already added");
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
  else{
    message.error("Language already added");
  }
  }

  fillDataSource = (value) => {
  const { languages } = this.props.languages_reducer;
  const { languagesList } = this.state;
  let dataSource = languages;
  if (value)
    dataSource = dataSource.filter(({id, name}) => name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
  return dataSource.map(({name}) => name).filter((name) => !languagesList.includes(name));
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

  changeTxt = (value) => {
  this.setState({
    searchTxt: value
  })
  }

  onClose = (value) => {
      this.setState({languagesList: this.state.languagesList.filter((sl) => (
        value !== sl
      ))});
  }


    handleSubmit = (e) => {
        e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              let  data = {}
              data["language_list"] = this.state.languagesList.join(", ");
              this.props.save(data).then((res) => {
              if (!this.props.freelancerProfile.success) {
              } else {
                this.props.fetchUserLanguages(Defender.currentUser().id);
                this.setModalLanguages(false);
                this.props.fetchViewUser(Defender.currentUser().id);
              }
              });
          }
      else {
        this.props.fetchUserLanguages(Defender.currentUser().id);
        this.props.fetchViewUser(Defender.currentUser().id);
      }
      });
  }

  render() {
    //const { getFieldDecorator } = this.props.form;
//    const { languages } = this.props.languages_reducer;
    const { dataSource, searchTxt } = this.state;
    const children = ((value) => (<Option key={value} text={value}>{value}</Option>));

    return (
      <div className="popups-holder">
        <Modal
          title="Add Languages"
          centered
          visible={this.state.modal_languages}
          onOk={() => this.setModalLanguages(false)}
          onCancel={() => this.setModalLanguages(false)}
          footer={[
          <Form key={2} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="content-block tag-holder">
              <div className="search-fields-holder">
                <AutoComplete
                    style={{ width: '100%', height:'40px' }}
                    onSelect={this.onSelect}
                    placeholder="Search Languages"
                    dataSource={dataSource.map(children)}
                    onSearch={this.onSearch}
                    value={searchTxt}
                    onChange={this.changeTxt}
                    >
                </AutoComplete>
              </div>
              <div className="default-tags-list">
                      { 
                        this.state.languagesList.map((val) => (
                            <Tag closable onClose={() => this.onClose(val)} color="#1890ff" key={val}>{val}</Tag>
                        )) 
                    }
              </div>
            </div>
            <Button key="back" onClick={this.handleCancelUserLanguage.bind(this)}>Cancel</Button>
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
    toggleUserEducationForm: ownProps.cancelFunc,
    modal_languages: ownProps.modal_languages,
    user_languages_reducer: state.user_languages_reducer,
    languages_reducer: state.languages_reducer,
    freelancerProfile: state.freelancerProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchAllLanguages: () => (dispatch(lActions.fetch())),

      fetchUserLanguages: (user_id) => {
       dispatch(ulActions.fetch(user_id))
      },

      save: (data) => (dispatch(uActions.submitForm({user: data}))),

      fetchViewUser: (id) => {
        return dispatch(userActions.fetchViewUser(id))
      },

  };
}

const wrappedUserLanguageForm = Form.create()(UserLanguageForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserLanguageForm);
