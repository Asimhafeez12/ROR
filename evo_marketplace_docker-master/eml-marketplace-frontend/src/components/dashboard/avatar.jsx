import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Upload, Icon, message } from 'antd';
import * as uActions from './../../actions/avatar';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Image must smaller than 10MB!');
  }
  if (isJPG === true && isLt10M === true){
    return isJPG && isLt10M;
  }
  else if (isPNG === true && isLt10M === true){
    return isPNG && isLt10M;
  }
  else{
    return isJPG && isPNG && isLt10M;
  }
}

class Avatar extends Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      var element = document.getElementById("uploading_text");
      if (element){
        element.parentNode.removeChild(element);
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.props.updateAvatarPhoto(info.file.response);
        this.setState({
          imageUrl,
          loading: false,
        })
      } );
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Click or drag image in this area</div>
      </div>
    );
    console.log(process.env)
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="tmp_file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${process.env.REACT_APP_API_URL}/tmp_fileuploader`}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <div className="avatar-image-holder"><img src={imageUrl} alt="Wurker.ai - Connecting Top AI talent with Cool Companies" /></div> : uploadButton}
      </Upload>
    );
  }
}


function mapStateToProps(state) {
  return { 
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateAvatarPhoto: (data) => dispatch(uActions.updateUserPhoto(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
