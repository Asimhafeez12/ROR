import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Carousel, message } from 'antd';
import PersonalInformation from './personal_information';
import FreelancerRegistration from './../../../api/freelancer_registration';
import SkillsForm from './skills_form';
import Certifications from './certifications';
import Experience from './experience';
import Appointment from './appointment';
import * as rActions from './../../../actions/auth/registrations';
import * as sActions from './../../../actions/auth/sign_in';
import Defender from './../../../helpers/defender';


class FreelancerSignUp extends Component {

  state = {
    confirmDirty: false,
    formList: [],
  };
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
  beforeChange = (event) => {
    const { slick } = this.carousel;
    const { currentSlide } = slick.innerSlider.state;
    const currentObject = this.state.formList[currentSlide].currentObject;
    const currentForm = currentObject.props.form;
    const currentState = currentObject.state;
    const { updatePersonalInformation, updateSkillsetList } = this.props;
    if (currentState.lastScreen) {
      currentForm.validateFieldsAndScroll((err, values) => {
        if(!err) {
          const userAppointmentFields = values;
          const { certifications } = this.props.FLRCertification;
          const { experiences } = this.props.FLRExperience;

          const { personal_information } = this.props.registerFLRPersonalInformation;

          let data = {
            user: {
              ...personal_information,
              user_certificates_attributes: certifications,
              user_experiences_attributes: experiences,
              ...userAppointmentFields,
              role_adder: 2,
            }
          };
          this.props.save(data).then(res => {
             let  user_data = {};
             user_data["email"]= personal_information.email;
             user_data["password"]=personal_information.password;
             this.props.login(user_data).then( res => {
               const { loggedInReducer, form } = this.props;
               if (!loggedInReducer.success) {
               let errors ={};
               errors["email"] = {};
               errors["email"]["value"] = user_data["email"];
               errors["email"]["errors"] = [new Error(loggedInReducer.loggedInError.error)];
               form.setFields(errors);
               } else {
                const token = res.headers['authorization'];
                Defender.loggedIn(res.data, token);
                window.location = "/";
               //this.props.dispatch(push('/'));
               //setTimeout(function(){return window.location.reload();}, 50)
               }

             });
            
          });

        }
      })
    } else if (currentState.skipFormVerification) {
      if (currentState.name === 'certifications') {
        if(this.props.FLRCertification.certifications.length < 1) {
          message.error('Add atleast one certification');
        } else {
          slick.innerSlider.slickNext();
        }
      }
      if (currentState.name === 'experiences') {
        if (this.props.FLRExperience.experiences.length < 1) {
          message.error('Add atleast one experience');
        } else {
          slick.innerSlider.slickNext();
        }
      }
    } else {
      currentForm.validateFieldsAndScroll((err, values) => {
        if(!err) {
          // trigger the personal information validation
          // it will validdate the personal information before moving
          // to next slide
          if ("email" in values) {
            FreelancerRegistration.validate({ user: { email: values.email }}).then(({data}) => {
              if (!data.success) {
                let errors = {};
                errors["email"] = {};
                errors["email"]["value"] = values.email;
                errors["email"]["errors"] = [new Error("Already taken")];
                currentForm.setFields(errors);
              } else {
                updatePersonalInformation(values);
                slick.innerSlider.slickNext();
              }
            });
          } else if ("skills_list" in values) {
            if (currentState.skillsList.length <= 2) {
              let errors = {};
              errors['skills_list'] = {};
              errors['skills_list']['value'] = '';
              errors['skills_list']['errors'] = [new Error('Please add atleast 3 skills')]
              currentForm.setFields(errors);
            } else {
              updateSkillsetList(currentState.skillsList);
              slick.innerSlider.slickNext();
            }
          }
        }
      });
    }
  }
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	handleSubmit = (e) => {
		e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
		});
	}
  setCurrentForm = (form) => {
    let { formList } = this.state;
    formList.push(form)
    this.setState({
      formList: formList
    });

  }
	render() {
		const settings = {
			dots: true,
			arrows: false,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
  
		return (
		  <div className="freelancer-signup">
			<Carousel {...settings} ref={ node => this.carousel = node } effect="fade">
				<PersonalInformation setCurrentForm={this.setCurrentForm.bind(this)} />
        <SkillsForm setCurrentForm={this.setCurrentForm.bind(this)} />
				<Certifications setCurrentForm={this.setCurrentForm.bind(this)} />
        <Experience setCurrentForm={this.setCurrentForm.bind(this)} />
				<Appointment setCurrentForm={this.setCurrentForm.bind(this)} />
			</Carousel>
      <button onClick={this.beforeChange.bind(this)}>Next</button>
		  </div>
		);
	}
}


function mapPropsToState(state) {
  return {
    registerFLReducer: state.registerFLReducer,
    registerFLRPersonalInformation: state.FLRPersonalInformation,
    FLRCertification: state.FLRCertification,
    FLRExperience: state.FLRExperience,
    loggedInReducer: state.logInReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updatePersonalInformation: (data) => (dispatch(rActions.updateFLRPersonalInformation(data))),
    updateSkillsetList: (data) => (dispatch(rActions.updateFLRSkillList(data))),
    save: (data) => (dispatch(rActions.registerUser(data))),
    login: (data) => dispatch(sActions.checkLoggedIn({user: data})),
  }
}
const wrappedFreelancerSignUpForm = Form.create()(FreelancerSignUp)
export default connect(mapPropsToState, mapDispatchToProps)(wrappedFreelancerSignUpForm);
