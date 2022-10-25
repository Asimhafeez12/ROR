import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, message, DatePicker, Upload } from 'antd';
import * as rActions from './../../../actions/auth/registrations';

const FormItem = Form.Item;

class Certifications extends Component {

  state = {
    confirmDirty: false,
    skipFormVerification: true,
    name: 'certifications',
    fileList: [],
    saveFileList: [],
  }
  componentDidMount() {
    this.props.setCurrentForm({ currentObject: this });
  }
  fileName = (name) => {
    let fileList = name.split("/");
    return fileList[fileList.length - 1];
  }
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = { ...values, certificate_files_attributes: this.state.saveFileList };
        this.props.appendCertification(data);
        this.setState({ fileList: [], saveFileList: [] });
        this.props.form.resetFields();
      }
    });
  }
  removeCertificate = (e, title, institution_name, description, certificate_files_attributes) => {
    let data = {title, institution_name, description, certificate_files_attributes: this.state.saveFileList };
    this.props.removeFLRCertification(data);
    this.setState({ fileList: [], saveFileList: [] });
    this.props.form.resetFields();

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const { certifications } = this.props.FLRCertification;
    const _that = this;
    const Dragger = Upload.Dragger;
    const fileProps = {
      name: 'tmp_file',
      multiple: true,
      fileList: this.state.fileList,
      action: `${process.env.REACT_APP_API_URL}/tmp_fileuploader`,
      onRemove(file) {
        _that.setState({saveFilesList: _that.state.saveFileList.filter((fl) => (
          fl.file === file.response.file
        ))
        });
      },
      beforeUpload(info){
        const uploaded_file = this.fileList.length;
        var occurances = 0;
        var i = 0;
        const extension = info.name.split('.').pop();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'pdf' || extension === 'zip' || extension === 'txt'){
          for (i = 0; i < uploaded_file; i++) {
            if (this.fileList[i].name === info.name){
              occurances = occurances + 1;
            }
          }
          if (uploaded_file > 0 && occurances > 0){
            message.error('File already uploaded');
            return false;
          }
          else{
            return true;
          }
        }
        else{
          message.error('File type not allowed');
          return false;
        }
      },
      onChange(info) {
        const status = info.file.status;
          if (status === undefined){
            info.fileList.splice(-1,1);
          }
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            let { saveFileList } = _that.state;
            saveFileList.push({file: info.file.response.file});
            _that.setState({saveFileList: saveFileList});
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            console.log(info.file, info.fileList);
            message.error(`${info.file.name} file upload failed.`);
          }
          _that.setState({fileList: info.fileList});
      },
    };

    return (
      <div className="freelancer-signup-form-holder certification-block">
        <div className="freelancer-signup-heading">
          <h2>Join The Team</h2>
          <h3>3 - Certifications in AI or anything related to it</h3>
        </div>
        <div className="freelancer-signup-body">
          <Form >
            <div className="freelancer-signup-form-row">
              <div className="freelancer-signup-form-columns">
                <FormItem label="Title of Certification">
                  {
                    getFieldDecorator('title', {
                      rules: [{ required: true, message: 'Title of Certification' }, {max: 100, message: 'Please enter less text for title'}],
                      })(<Input size="large" />)
                  }
                </FormItem>
                

              </div>
              <div className="freelancer-signup-form-columns">
                <FormItem label="Date">
                  {getFieldDecorator('date', {
                  rules: [{ required: true, message: 'Please Select Date' }],
                  })(<RangePicker size="large" style={{ width:"100%" }} />)}
                </FormItem>
              </div>
              <div className="freelancer-signup-form-columns">
                <FormItem label="Name of Institute/Online Platform">
                  {getFieldDecorator('institution_name', {
                    rules: [{ required: true, message: 'Please Enter Institute Name' }, {max: 100, message: 'Please enter less text for institution name'}],
                    })(<Input size="large" />)
                  }
                </FormItem>
              </div>
            </div>
            
            <div className="freelancer-signup-form-row">
              <FormItem label="Description">
                {
                  getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please Enter Description' }, {max: 500, message: 'Please enter less text for description'}],
                    })(<TextArea id= "certificate_description" placeholder="Write a small description about what you have learned, what topics were covered etc" rows={4} />)
                }
              </FormItem>
            </div>
            <div className="freelancer-signup-form-row">
              <div className="image-uploader">
                <Dragger {...fileProps}>
										<span className="upload-drag-icon">
											<Icon type="upload" />
										</span>
										<div className="upload-contents">
											<p className="ant-upload-text">Click or drag file to this area to upload</p>
											<p className="ant-upload-hint">Upload project files or the files which can help explain your project</p>
										</div>
									</Dragger>
								</div>
            </div>
            <div className="freelancer-signup-form-row">
              <FormItem>
                <Button className="add-btn" type="primary" onClick={this.handleSubmit}>Add</Button>
              </FormItem>
            </div>
            { certifications.map(({title, institution_name, description, date, certificate_files_attributes}, index) =>
              <div className="freelancer-signup add-data" key={index}>
                <div className="heading">
                  <div className="left-align">
                    <h3>{title}<a onClick={this.removeCertificate.bind(this, title, institution_name, description, certificate_files_attributes)}><Icon type="delete" theme="outlined" style={{ color:'#14141c' }} /></a></h3>
                    <span>{institution_name}</span>
                  </div>
                  <div className="right-align">
                    <span>{date[0].calendar()} - {date[1].calendar()}</span>
                  </div>
                </div>
                <div className="details">
                  <p>{description}</p>
                </div>
                { certificate_files_attributes && certificate_files_attributes.map(({file}, index) =>
                  <React.Fragment key={index}>
                    <a target="_blank" href={file}>
                      {this.fileName(file)}
                    </a>
                    <br/>
                  </React.Fragment>
                )}
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    FLRCertification: state.FLRCertification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appendCertification: (data) => dispatch(rActions.appendFLRCertifications(data)),
    removeFLRCertification: (data) => dispatch(rActions.removeFLRCertification(data)),
  }
}
const wrappedCertificationsForm = Form.create()(Certifications);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedCertificationsForm);
