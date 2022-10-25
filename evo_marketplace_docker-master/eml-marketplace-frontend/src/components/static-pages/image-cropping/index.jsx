import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, message, Upload, Form } from 'antd';
import ImageCrop from 'react-image-crop-component'
import 'react-image-crop-component/style.css'
import idealImage from './../../../images/ideal-image.png';
import Defender from './../../../helpers/defender';
import ClientImage from '../../../images/client_default.png';
import FreelancerImage from '../../../images/freelancer_default.png';
import * as userActions from './../../../actions/users/';
import * as uActions from '../../../actions/freelance_profile';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class ImageCroppingForm extends Component{

	state = {
		orignalImageUrl: Defender.currentUser().avatar_url,
		imageData: "",
		loading: false,
		PopupStatus: false,
    	confirmDirty: false,
    	modal_image_cropping: true,
    	imageUrl: Defender.currentUser().avatar_url,
    	originFileObj: null
	}

	componentWillMount() {
		if (this.state.orignalImageUrl){}
		else
		if (Defender.currentUser()._r.includes("client")){
			this.setState({ orignalImageUrl: ClientImage });
		}
		else
		if (Defender.currentUser()._r.includes("freelancer")){
			this.setState({ orignalImageUrl: FreelancerImage });
		}
		if (this.state.imageUrl){}
		else
		if (Defender.currentUser()._r.includes("client")){
			this.setState({ imageUrl: ClientImage });
		}
		else
		if (Defender.currentUser()._r.includes("freelancer")){
			this.setState({ imageUrl: FreelancerImage });
		}
	}


    constructor(){
        super()
        this.onCropped = this._onCropped.bind(this)
    }

	setModalImageCropping(modal_image_cropping) {
		this.setState({ modal_image_cropping });
	}

	handleCancelImageCropping(e){
		e.preventDefault();
		this.setState({ modal_image_cropping: false });
	}


	PopupShow(PopupStatus) {
		this.setState({ PopupStatus });
	}

	handleOk = () => {
		this.setState({ loading: true });
      	let  data = {}
        data["avatar"] = this.state.imageUrl ;
	      this.props.update_basic_info(data).then((res) => {
	      if (!this.props.freelancerProfile.success) {} 
	        else {
	          this.props.updateCurrentUser();
	          this.props.fetchViewUser(Defender.currentUser().id);
	          window.location.reload();
	        }
	      });
	}

	handleCancel = () => {
		this.setState({ PopupStatus: false });
	}

	_onCropped = (e) => {
		let image = e.image
		let image_data = e.data

		this.setState({ imageUrl: image});
		this.setState({ imageData: image_data});
	}

	render(){
		const { loading } = this.state;
		const _that = this;

		const props = {
			name: 'tmp_file',
			action: `${process.env.REACT_APP_API_URL}/tmp_fileuploader`,

			onChange(info) {
				if (info.file.status === undefined){
				}
				if (info.file.status !== 'uploading') {
				}
				if (info.file.status === 'removed') {
				}
				if (info.file.status === 'done') {
					 _that.setState({ imageUrl: info.file.response.file });
					 _that.setState({ orignalImageUrl: info.file.response.file });
					 _that.setState({ originFileObj: info.file.originFileObj });
				} 
				else if (info.file.status === 'error') {
				  message.error(`${info.file.name} file upload failed.`);
				}
			},
		};
		return(
			<div className="image-cropping-holder">
				<Modal
					width='700px'
					title="Profile Photo"
					centered
					visible={this.state.modal_image_cropping}
					onOk={() => this.setModalImageCropping(false)}
					onCancel={() => this.setModalImageCropping(false)}
					footer={[
						<Button key="Cancel" onClick={this.handleCancelImageCropping.bind(this)}>Cancel</Button>,
						<Button key="Save" type="primary" loading={loading} onClick={this.handleOk}>Save</Button>,
					]}
					>
					<Form>

						<div className="image-cropping-top">
							<div className="image-cropping-block">
							  		<ImageCrop src={this.state.orignalImageUrl}
									setWidth={300} 
									setHeight={300} 
									square={true} 
									resize={true}
									border={"dashed #ffffff 2px"}
									watch={this.watch}
									onCrop={this.onCropped}
									crossOrigin="Anonymous"/>
							</div>
							<Upload {...props}><Button>Upload a photo</Button></Upload>
						</div>

						<div className="image-cropping-bottom">
							<div className="image-preview-block">
								<img src={this.state.imageUrl} crossOrigin="Anonymous" data_x={this.state.imageData.x} data_y={this.state.imageData.y} data_height={this.state.imageData.height} data_width={this.state.imageData.width} alt="User Help | Wurker.ai - Connecting Top AI talent with Cool Companies" />
							</div>
							<div className="image-instructions-block">
								<div className="image-instructions-holder">
									<h2>Photo uploading guidelines:</h2>
									<ul>
										<li>- Face the camera.</li>
										<li>- Simple background.</li>
										<li>- Crop your image around face.</li>
										<li>- Smile.</li>
									</ul>
								</div>
								<div className="ideal-image-holder">
									<span>Ideal profile photo:</span>
									<div className="image-holder">
										<img src={idealImage} crossOrigin="Anonymous" alt="User Help | Wurker.ai - Connecting Top AI talent with Cool Companies" />
									</div>
								</div>
							</div>


						</div>
					</Form>



				</Modal>
			</div>
		);
	}
}


function mapStateToProps(state, ownProps) {
  return {
    toggleImageCroppingForm: ownProps.cancelFunc,
    modal_image_cropping: ownProps.modal_image_cropping,
    user_view_reducer: state.user_view_reducer,
    freelancerProfile: state.freelancerProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchViewUser: (id) => {
        return dispatch(userActions.fetchViewUser(id))
      },
      update_basic_info: (data) => (dispatch(uActions.submitForm({user: data}))),
      updateCurrentUser: () => (dispatch(userActions.updateCurrentUser())),
  };
}

const wrappedImageCroppingForm = Form.create()(ImageCroppingForm);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedImageCroppingForm);


