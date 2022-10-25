import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Modal, Tag, AutoComplete, Select, message } from 'antd';
import * as lActions from './../../actions/languages';
import * as ulActions from './../../actions/users/user_languages';
import * as uActions from '../../actions/freelance_profile';
import Defender from './../../helpers/defender';

const Option = Select.Option;


class UserLanguageForm extends Component {
  state = {
    confirmDirty: false,
    modal_languages: this.props.modal_languages,
    languagesList: Defender.currentUser().language_list,
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
      if (languagesList.includes(value)){
        message.error("Language already added");
      }
      else{
        languagesList.push(value);
        this.setState({languagesList: languagesList});
        }
  }

  onClose = (value) => {
      this.setState({languagesList: this.state.languagesList.filter((ll) => (
        value !== ll
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
              }
              });
          }
      else {
        this.props.fetchUserLanguages(Defender.currentUser().id);
      }
      });
  }

  render() {
    //const { getFieldDecorator } = this.props.form;
    const { languages } = this.props.languages_reducer;
    const Complete = () => {
      const children = languages.map((result) => {
          return <Option key={result.name}>{result.name}</Option>
      });
    return (
      <AutoComplete
          style={{ width: '100%' }}
              onSelect={this.onSelect}
          placeholder="Search Languages"
          >
            {children}
        </AutoComplete>
        );
    }

    return (
      <div className="popups-holder">
        <Modal
          title="Add Skills"
          centered
          visible={this.state.modal_languages}
          onOk={() => this.setModalLanguages(false)}
          onCancel={() => this.setModalLanguages(false)}
          footer={[
          <Form key={2} className="job-post-form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="content-block tag-holder">
              <div className="search-fields-holder">
                <Complete />
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


      //addEducation: (data) => (dispatch(ueActions.add(data)))
  };
}

const wrappedUserLanguageForm = Form.create()(UserLanguageForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedUserLanguageForm);
