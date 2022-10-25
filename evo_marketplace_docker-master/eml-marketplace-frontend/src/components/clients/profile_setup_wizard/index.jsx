import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Icon,Button } from 'antd';
import { push } from 'react-router-redux';
import Defender from './../../../helpers/defender';
import Avatar from '../../dashboard/avatar';
import * as uActions from './../../../actions/client_profile_wizard';
import * as userActions from './../../../actions/users';
const FormItem = Form.Item;
const Option = Select.Option;




class ClientProfileSetupWizard extends Component {

	selectCountry (val) {
		let data= {};
		data["country"] = val;
		data["phone_number"] = this.props.form.getFieldValue('phone_number');
    if (this.props.avatarReducer.avatar)
      data["avatar"] = this.props.avatarReducer.avatar;
		this.props.dispatch(uActions.updateWizardFields(data));
	}

	state = {
		confirmDirty: false,
	};
	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {  avatar } = this.props.avatarReducer;
        let  data = {}
        data["is_c_profile_setup"] = true;
        data["title"] = values.title;
        data["city"] = values.city;
        data["avatar"] = avatar;
        data["country"] = values.country;
        data["phone_number"] = values.phone_number;
        if (avatar)
          data["avatar"] = avatar;
        this.props.dispatch(uActions.submitForm({user: data})).then((res) => {
          if (!this.props.clientProfileReducer.success) {
          } else {
            this.props.dispatch(userActions.updateCurrentUser()).then( () => {
              this.props.dispatch(push('/client'));
            });
          }
			 });
			}
		});
	}
	handleConfirmBlur = (e) => {}

	render() {
		const { getFieldDecorator } = this.props.form;
    	const { currentUser } = this.props.auth;


		return (
			<div className="client-wizard-profile-table">
				<div className="client-wizard-profile-table-cell">
					<div className="client-wizard-profile">
						<div className="client-wizard-profile-header">
							<h2>Welcome {currentUser.first_name} {currentUser.last_name}</h2>
							<h3>Please Complete Your Profile</h3>
						</div>

						<div className="client-wizard-profile-content">
							<Form onSubmit={this.handleSubmit}>
								<div className="client-profile-inputfieds">
						            <FormItem className="popup-form-title">
						                {getFieldDecorator('title',{
						                	initialValue: Defender.currentUser().title,
						                  })(
						                <Input size="large" placeholder="Title" />
						                )}
						            </FormItem>
						            {Defender.currentUser().country ?
						                <FormItem>
						                  {getFieldDecorator('country',{
						                    initialValue: Defender.currentUser().country,
						                  })(
						                    <Select size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Select Country">
						                      <Option value="Afghanistan">Afghanistan</Option>
						                      <Option value="Albania">Albania</Option>
						                      <Option value="Algeria">Algeria</Option>
						                      <Option value="Andorra">Andorra</Option>
						                      <Option value="Angola">Angola</Option>
						                      <Option value="Antigua & Deps">Antigua & Deps</Option>
						                      <Option value="Argentina">Argentina</Option>
						                      <Option value="Armenia">Armenia</Option>
						                      <Option value="Australia">Australia</Option>
						                      <Option value="Austria">Austria</Option>
						                      <Option value="Azerbaijan">Azerbaijan</Option>
						                      <Option value="Bahamas">Bahamas</Option>
						                      <Option value="Bahrain">Bahrain</Option>
						                      <Option value="Bangladesh">Bangladesh</Option>
						                      <Option value="Barbados">Barbados</Option>
						                      <Option value="Belarus">Belarus</Option>
						                      <Option value="Belgium">Belgium</Option>
						                      <Option value="Belize">Belize</Option>
						                      <Option value="Benin">Benin</Option>
						                      <Option value="Bhutan">Bhutan</Option>
						                      <Option value="Bolivia">Bolivia</Option>
						                      <Option value="Bosnia Herzegovina">Bosnia Herzegovina</Option>
						                      <Option value="Botswana">Botswana</Option>
						                      <Option value="Brazil">Brazil</Option>
						                      <Option value="Brunei">Brunei</Option>
						                      <Option value="Bulgaria">Bulgaria</Option>
						                      <Option value="Burkina">Burkina</Option>
						                      <Option value="Burundi">Burundi</Option>
						                      <Option value="Cambodia">Cambodia</Option>
						                      <Option value="Cameroon">Cameroon</Option>
						                      <Option value="Canada">Canada</Option>
						                      <Option value="Cape Verde">Cape Verde</Option>
						                      <Option value="Central African Rep">Central African Rep</Option>
						                      <Option value="Chad">Chad</Option>
						                      <Option value="Chile">Chile</Option>
						                      <Option value="China">China</Option>
						                      <Option value="Colombia">Colombia</Option>
						                      <Option value="Comoros">Comoros</Option>
						                      <Option value="Congo">Congo</Option>
						                      <Option value="Congo Democratic Rep">Congo "Democratic Rep"</Option>
						                      <Option value="Costa Rica">Costa Rica</Option>
						                      <Option value="Croatia">Croatia</Option>
						                      <Option value="Cuba">Cuba</Option>
						                      <Option value="Cyprus">Cyprus</Option>
						                      <Option value="Czech Republic">Czech Republic</Option>
						                      <Option value="Denmark">Denmark</Option>
						                      <Option value="Djibouti">Djibouti</Option>
						                      <Option value="Dominica">Dominica</Option>
						                      <Option value="Dominican Republic">Dominican Republic</Option>
						                      <Option value="East Timor">East Timor</Option>
						                      <Option value="Ecuador">Ecuador</Option>
						                      <Option value="Egypt">Egypt</Option>
						                      <Option value="El Salvador">El Salvador</Option>
						                      <Option value="Equatorial Guinea">Equatorial Guinea</Option>
						                      <Option value="Eritrea">Eritrea</Option>
						                      <Option value="Estonia">Estonia</Option>
						                      <Option value="Ethiopia">Ethiopia</Option>
						                      <Option value="Fiji">Fiji</Option>
						                      <Option value="Finland">Finland</Option>
						                      <Option value="France">France</Option>
						                      <Option value="Gabon">Gabon</Option>
						                      <Option value="Gambia">Gambia</Option>
						                      <Option value="Georgia">Georgia</Option>
						                      <Option value="Germany">Germany</Option>
						                      <Option value="Ghana">Ghana</Option>
						                      <Option value="Greece">Greece</Option>
						                      <Option value="Grenada">Grenada</Option>
						                      <Option value="Guatemala">Guatemala</Option>
						                      <Option value="Guinea">Guinea</Option>
						                      <Option value="Guinea Bissau">Guinea Bissau</Option>
						                      <Option value="Guyana">Guyana</Option>
						                      <Option value="Haiti">Haiti</Option>
						                      <Option value="Honduras">Honduras</Option>
						                      <Option value="Hungary">Hungary</Option>
						                      <Option value="Iceland">Iceland</Option>
						                      <Option value="India">India</Option>
						                      <Option value="Indonesia">Indonesia</Option>
						                      <Option value="Iran">Iran</Option>
						                      <Option value="Iraq">Iraq</Option>
						                      <Option value="Ireland Republic">Ireland "Republic"</Option>
						                      <Option value="Israel">Israel</Option>
						                      <Option value="Italy">Italy</Option>
						                      <Option value="Ivory Coast">Ivory Coast</Option>
						                      <Option value="Jamaica">Jamaica</Option>
						                      <Option value="Japan">Japan</Option>
						                      <Option value="Jordan">Jordan</Option>
						                      <Option value="Kazakhstan">Kazakhstan</Option>
						                      <Option value="Kenya">Kenya</Option>
						                      <Option value="Kiribati">Kiribati</Option>
						                      <Option value="Korea North">Korea North</Option>
						                      <Option value="Korea South">Korea South</Option>
						                      <Option value="Kosovo">Kosovo</Option>
						                      <Option value="Kuwait">Kuwait</Option>
						                      <Option value="Kyrgyzstan">Kyrgyzstan</Option>
						                      <Option value="Laos">Laos</Option>
						                      <Option value="Latvia">Latvia</Option>
						                      <Option value="Lebanon">Lebanon</Option>
						                      <Option value="Lesotho">Lesotho</Option>
						                      <Option value="Liberia">Liberia</Option>
						                      <Option value="Libya">Libya</Option>
						                      <Option value="Liechtenstein">Liechtenstein</Option>
						                      <Option value="Lithuania">Lithuania</Option>
						                      <Option value="Luxembourg">Luxembourg</Option>
						                      <Option value="Macedonia">Macedonia</Option>
						                      <Option value="Madagascar">Madagascar</Option>
						                      <Option value="Malawi">Malawi</Option>
						                      <Option value="Malaysia">Malaysia</Option>
						                      <Option value="Maldives">Maldives</Option>
						                      <Option value="Mali">Mali</Option>
						                      <Option value="Malta">Malta</Option>
						                      <Option value="Marshall Islands">Marshall Islands</Option>
						                      <Option value="Mauritania">Mauritania</Option>
						                      <Option value="Mauritius">Mauritius</Option>
						                      <Option value="Mexico">Mexico</Option>
						                      <Option value="Micronesia">Micronesia</Option>
						                      <Option value="Moldova">Moldova</Option>
						                      <Option value="Monaco">Monaco</Option>
						                      <Option value="Mongolia">Mongolia</Option>
						                      <Option value="Montenegro">Montenegro</Option>
						                      <Option value="Morocco">Morocco</Option>
						                      <Option value="Mozambique">Mozambique</Option>
						                      <Option value="Myanmar Burma">Myanmar, "Burma"</Option>
						                      <Option value="Namibia">Namibia</Option>
						                      <Option value="Nauru">Nauru</Option>
						                      <Option value="Nepal">Nepal</Option>
						                      <Option value="Netherlands">Netherlands</Option>
						                      <Option value="New Zealand">New Zealand</Option>
						                      <Option value="Nicaragua">Nicaragua</Option>
						                      <Option value="Niger">Niger</Option>
						                      <Option value="Nigeria">Nigeria</Option>
						                      <Option value="Norway">Norway</Option>
						                      <Option value="Oman">Oman</Option>
						                      <Option value="Pakistan">Pakistan</Option>
						                      <Option value="Palau">Palau</Option>
						                      <Option value="Panama">Panama</Option>
						                      <Option value="Papua New Guinea">Papua New Guinea</Option>
						                      <Option value="Paraguay">Paraguay</Option>
						                      <Option value="Peru">Peru</Option>
						                      <Option value="Philippines">Philippines</Option>
						                      <Option value="Poland">Poland</Option>
						                      <Option value="Portugal">Portugal</Option>
						                      <Option value="Qatar">Qatar</Option>
						                      <Option value="Romania">Romania</Option>
						                      <Option value="Russian Federation">Russian Federation</Option>
						                      <Option value="Rwanda">Rwanda</Option>
						                      <Option value="St Kitts & Nevis">St Kitts & Nevis</Option>
						                      <Option value="St Lucia">St Lucia</Option>
						                      <Option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</Option>
						                      <Option value="Samoa">Samoa</Option>
						                      <Option value="San Marino">San Marino</Option>
						                      <Option value="Sao Tome & Principe">Sao Tome & Principe</Option>
						                      <Option value="Saudi Arabia">Saudi Arabia</Option>
						                      <Option value="Senegal">Senegal</Option>
						                      <Option value="Serbia">Serbia</Option>
						                      <Option value="Seychelles">Seychelles</Option>
						                      <Option value="Sierra Leone">Sierra Leone</Option>
						                      <Option value="Singapore">Singapore</Option>
						                      <Option value="Slovenia">Slovenia</Option>
						                      <Option value="Solomon Islands">Solomon Islands</Option>
						                      <Option value="Somalia">Somalia</Option>
						                      <Option value="South Africa">South Africa</Option>
						                      <Option value="South Sudan">South Sudan</Option>
						                      <Option value="Spain">Spain</Option>
						                      <Option value="Sri Lanka">Sri Lanka</Option>
						                      <Option value="Sudan">Sudan</Option>
						                      <Option value="Suriname">Suriname</Option>
						                      <Option value="Swaziland">Swaziland</Option>
						                      <Option value="Sweden">Sweden</Option>
						                      <Option value="Switzerland">Switzerland</Option>
						                      <Option value="Syria">Syria</Option>
						                      <Option value="Taiwan">Taiwan</Option>
						                      <Option value="Tajikistan">Tajikistan</Option>
						                      <Option value="Tanzania">Tanzania</Option>
						                      <Option value="Thailand">Thailand</Option>
						                      <Option value="Togo">Togo</Option>
						                      <Option value="Tonga">Tonga</Option>
						                      <Option value="Trinidad & Tobago">Trinidad & Tobago</Option>
						                      <Option value="Tunisia">Tunisia</Option>
						                      <Option value="Turkey">Turkey</Option>
						                      <Option value="Turkmenistan">Turkmenistan</Option>
						                      <Option value="Tuvalu">Tuvalu</Option>
						                      <Option value="Uganda">Uganda</Option>
						                      <Option value="Ukraine">Ukraine</Option>
						                      <Option value="United Arab Emirates">United Arab Emirates</Option>
						                      <Option value="United Kingdom">United Kingdom</Option>
						                      <Option value="United States">United States</Option>
						                      <Option value="Uruguay">Uruguay</Option>
						                      <Option value="Uzbekistan">Uzbekistan</Option>
						                      <Option value="Vanuatu">Vanuatu</Option>
						                      <Option value="Vatican City">Vatican City</Option>
						                      <Option value="Venezuela">Venezuela</Option>
						                      <Option value="Vietnam">Vietnam</Option>
						                      <Option value="Yemen">Yemen</Option>
						                      <Option value="Zambia">Zambia</Option>
						                      <Option value="Zimbabwe">Zimbabwe</Option>
						                    </Select>
						                  )}
						                </FormItem>
						            : 
						                <FormItem>
						                  {getFieldDecorator('country',{
						                    initialValue: "Albania",
						                  })(
						                    <Select size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Select Country">
						                      <Option value="Afghanistan">Afghanistan</Option>
						                      <Option value="Albania">Albania</Option>
						                      <Option value="Algeria">Algeria</Option>
						                      <Option value="Andorra">Andorra</Option>
						                      <Option value="Angola">Angola</Option>
						                      <Option value="Antigua & Deps">Antigua & Deps</Option>
						                      <Option value="Argentina">Argentina</Option>
						                      <Option value="Armenia">Armenia</Option>
						                      <Option value="Australia">Australia</Option>
						                      <Option value="Austria">Austria</Option>
						                      <Option value="Azerbaijan">Azerbaijan</Option>
						                      <Option value="Bahamas">Bahamas</Option>
						                      <Option value="Bahrain">Bahrain</Option>
						                      <Option value="Bangladesh">Bangladesh</Option>
						                      <Option value="Barbados">Barbados</Option>
						                      <Option value="Belarus">Belarus</Option>
						                      <Option value="Belgium">Belgium</Option>
						                      <Option value="Belize">Belize</Option>
						                      <Option value="Benin">Benin</Option>
						                      <Option value="Bhutan">Bhutan</Option>
						                      <Option value="Bolivia">Bolivia</Option>
						                      <Option value="Bosnia Herzegovina">Bosnia Herzegovina</Option>
						                      <Option value="Botswana">Botswana</Option>
						                      <Option value="Brazil">Brazil</Option>
						                      <Option value="Brunei">Brunei</Option>
						                      <Option value="Bulgaria">Bulgaria</Option>
						                      <Option value="Burkina">Burkina</Option>
						                      <Option value="Burundi">Burundi</Option>
						                      <Option value="Cambodia">Cambodia</Option>
						                      <Option value="Cameroon">Cameroon</Option>
						                      <Option value="Canada">Canada</Option>
						                      <Option value="Cape Verde">Cape Verde</Option>
						                      <Option value="Central African Rep">Central African Rep</Option>
						                      <Option value="Chad">Chad</Option>
						                      <Option value="Chile">Chile</Option>
						                      <Option value="China">China</Option>
						                      <Option value="Colombia">Colombia</Option>
						                      <Option value="Comoros">Comoros</Option>
						                      <Option value="Congo">Congo</Option>
						                      <Option value="Congo Democratic Rep">Congo "Democratic Rep"</Option>
						                      <Option value="Costa Rica">Costa Rica</Option>
						                      <Option value="Croatia">Croatia</Option>
						                      <Option value="Cuba">Cuba</Option>
						                      <Option value="Cyprus">Cyprus</Option>
						                      <Option value="Czech Republic">Czech Republic</Option>
						                      <Option value="Denmark">Denmark</Option>
						                      <Option value="Djibouti">Djibouti</Option>
						                      <Option value="Dominica">Dominica</Option>
						                      <Option value="Dominican Republic">Dominican Republic</Option>
						                      <Option value="East Timor">East Timor</Option>
						                      <Option value="Ecuador">Ecuador</Option>
						                      <Option value="Egypt">Egypt</Option>
						                      <Option value="El Salvador">El Salvador</Option>
						                      <Option value="Equatorial Guinea">Equatorial Guinea</Option>
						                      <Option value="Eritrea">Eritrea</Option>
						                      <Option value="Estonia">Estonia</Option>
						                      <Option value="Ethiopia">Ethiopia</Option>
						                      <Option value="Fiji">Fiji</Option>
						                      <Option value="Finland">Finland</Option>
						                      <Option value="France">France</Option>
						                      <Option value="Gabon">Gabon</Option>
						                      <Option value="Gambia">Gambia</Option>
						                      <Option value="Georgia">Georgia</Option>
						                      <Option value="Germany">Germany</Option>
						                      <Option value="Ghana">Ghana</Option>
						                      <Option value="Greece">Greece</Option>
						                      <Option value="Grenada">Grenada</Option>
						                      <Option value="Guatemala">Guatemala</Option>
						                      <Option value="Guinea">Guinea</Option>
						                      <Option value="Guinea Bissau">Guinea Bissau</Option>
						                      <Option value="Guyana">Guyana</Option>
						                      <Option value="Haiti">Haiti</Option>
						                      <Option value="Honduras">Honduras</Option>
						                      <Option value="Hungary">Hungary</Option>
						                      <Option value="Iceland">Iceland</Option>
						                      <Option value="India">India</Option>
						                      <Option value="Indonesia">Indonesia</Option>
						                      <Option value="Iran">Iran</Option>
						                      <Option value="Iraq">Iraq</Option>
						                      <Option value="Ireland Republic">Ireland "Republic"</Option>
						                      <Option value="Israel">Israel</Option>
						                      <Option value="Italy">Italy</Option>
						                      <Option value="Ivory Coast">Ivory Coast</Option>
						                      <Option value="Jamaica">Jamaica</Option>
						                      <Option value="Japan">Japan</Option>
						                      <Option value="Jordan">Jordan</Option>
						                      <Option value="Kazakhstan">Kazakhstan</Option>
						                      <Option value="Kenya">Kenya</Option>
						                      <Option value="Kiribati">Kiribati</Option>
						                      <Option value="Korea North">Korea North</Option>
						                      <Option value="Korea South">Korea South</Option>
						                      <Option value="Kosovo">Kosovo</Option>
						                      <Option value="Kuwait">Kuwait</Option>
						                      <Option value="Kyrgyzstan">Kyrgyzstan</Option>
						                      <Option value="Laos">Laos</Option>
						                      <Option value="Latvia">Latvia</Option>
						                      <Option value="Lebanon">Lebanon</Option>
						                      <Option value="Lesotho">Lesotho</Option>
						                      <Option value="Liberia">Liberia</Option>
						                      <Option value="Libya">Libya</Option>
						                      <Option value="Liechtenstein">Liechtenstein</Option>
						                      <Option value="Lithuania">Lithuania</Option>
						                      <Option value="Luxembourg">Luxembourg</Option>
						                      <Option value="Macedonia">Macedonia</Option>
						                      <Option value="Madagascar">Madagascar</Option>
						                      <Option value="Malawi">Malawi</Option>
						                      <Option value="Malaysia">Malaysia</Option>
						                      <Option value="Maldives">Maldives</Option>
						                      <Option value="Mali">Mali</Option>
						                      <Option value="Malta">Malta</Option>
						                      <Option value="Marshall Islands">Marshall Islands</Option>
						                      <Option value="Mauritania">Mauritania</Option>
						                      <Option value="Mauritius">Mauritius</Option>
						                      <Option value="Mexico">Mexico</Option>
						                      <Option value="Micronesia">Micronesia</Option>
						                      <Option value="Moldova">Moldova</Option>
						                      <Option value="Monaco">Monaco</Option>
						                      <Option value="Mongolia">Mongolia</Option>
						                      <Option value="Montenegro">Montenegro</Option>
						                      <Option value="Morocco">Morocco</Option>
						                      <Option value="Mozambique">Mozambique</Option>
						                      <Option value="Myanmar Burma">Myanmar, "Burma"</Option>
						                      <Option value="Namibia">Namibia</Option>
						                      <Option value="Nauru">Nauru</Option>
						                      <Option value="Nepal">Nepal</Option>
						                      <Option value="Netherlands">Netherlands</Option>
						                      <Option value="New Zealand">New Zealand</Option>
						                      <Option value="Nicaragua">Nicaragua</Option>
						                      <Option value="Niger">Niger</Option>
						                      <Option value="Nigeria">Nigeria</Option>
						                      <Option value="Norway">Norway</Option>
						                      <Option value="Oman">Oman</Option>
						                      <Option value="Pakistan">Pakistan</Option>
						                      <Option value="Palau">Palau</Option>
						                      <Option value="Panama">Panama</Option>
						                      <Option value="Papua New Guinea">Papua New Guinea</Option>
						                      <Option value="Paraguay">Paraguay</Option>
						                      <Option value="Peru">Peru</Option>
						                      <Option value="Philippines">Philippines</Option>
						                      <Option value="Poland">Poland</Option>
						                      <Option value="Portugal">Portugal</Option>
						                      <Option value="Qatar">Qatar</Option>
						                      <Option value="Romania">Romania</Option>
						                      <Option value="Russian Federation">Russian Federation</Option>
						                      <Option value="Rwanda">Rwanda</Option>
						                      <Option value="St Kitts & Nevis">St Kitts & Nevis</Option>
						                      <Option value="St Lucia">St Lucia</Option>
						                      <Option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</Option>
						                      <Option value="Samoa">Samoa</Option>
						                      <Option value="San Marino">San Marino</Option>
						                      <Option value="Sao Tome & Principe">Sao Tome & Principe</Option>
						                      <Option value="Saudi Arabia">Saudi Arabia</Option>
						                      <Option value="Senegal">Senegal</Option>
						                      <Option value="Serbia">Serbia</Option>
						                      <Option value="Seychelles">Seychelles</Option>
						                      <Option value="Sierra Leone">Sierra Leone</Option>
						                      <Option value="Singapore">Singapore</Option>
						                      <Option value="Slovenia">Slovenia</Option>
						                      <Option value="Solomon Islands">Solomon Islands</Option>
						                      <Option value="Somalia">Somalia</Option>
						                      <Option value="South Africa">South Africa</Option>
						                      <Option value="South Sudan">South Sudan</Option>
						                      <Option value="Spain">Spain</Option>
						                      <Option value="Sri Lanka">Sri Lanka</Option>
						                      <Option value="Sudan">Sudan</Option>
						                      <Option value="Suriname">Suriname</Option>
						                      <Option value="Swaziland">Swaziland</Option>
						                      <Option value="Sweden">Sweden</Option>
						                      <Option value="Switzerland">Switzerland</Option>
						                      <Option value="Syria">Syria</Option>
						                      <Option value="Taiwan">Taiwan</Option>
						                      <Option value="Tajikistan">Tajikistan</Option>
						                      <Option value="Tanzania">Tanzania</Option>
						                      <Option value="Thailand">Thailand</Option>
						                      <Option value="Togo">Togo</Option>
						                      <Option value="Tonga">Tonga</Option>
						                      <Option value="Trinidad & Tobago">Trinidad & Tobago</Option>
						                      <Option value="Tunisia">Tunisia</Option>
						                      <Option value="Turkey">Turkey</Option>
						                      <Option value="Turkmenistan">Turkmenistan</Option>
						                      <Option value="Tuvalu">Tuvalu</Option>
						                      <Option value="Uganda">Uganda</Option>
						                      <Option value="Ukraine">Ukraine</Option>
						                      <Option value="United Arab Emirates">United Arab Emirates</Option>
						                      <Option value="United Kingdom">United Kingdom</Option>
						                      <Option value="United States">United States</Option>
						                      <Option value="Uruguay">Uruguay</Option>
						                      <Option value="Uzbekistan">Uzbekistan</Option>
						                      <Option value="Vanuatu">Vanuatu</Option>
						                      <Option value="Vatican City">Vatican City</Option>
						                      <Option value="Venezuela">Venezuela</Option>
						                      <Option value="Vietnam">Vietnam</Option>
						                      <Option value="Yemen">Yemen</Option>
						                      <Option value="Zambia">Zambia</Option>
						                      <Option value="Zimbabwe">Zimbabwe</Option>
						                    </Select>
						                  )}
						                </FormItem>
						            }
						            <FormItem className="popup-form-title">
						                {getFieldDecorator('city',{
						                	initialValue: Defender.currentUser().city,
						                  })(
						                  <Input size="large" placeholder="City" />
						                )}
						            </FormItem>
									<FormItem>
										{getFieldDecorator('phone_number',{
											initialValue: Defender.currentUser().phone_number,
											rules: [{
												required: true, message: 'Please input your phone number'
											}]
										})(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />)}
									</FormItem>
									<div className="client-profile-avatar-holder">
										<h3 id="uploading_text">Upload a profile picture</h3>
										<Avatar />
									</div>
									<FormItem>
										<a className="client-skip-btn" href="/client">Skip!</a>
										<Button size="large" type="primary" htmlType="submit" className="client-form-button">Submit</Button>
									</FormItem>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		clientProfileReducer: state.client_profile_wizard,
		avatarReducer: state.avatar,
    	auth: state.auth,
	}
}

const wrappedClientWizardForm = Form.create()(ClientProfileSetupWizard);
export default connect(mapStateToProps)(wrappedClientWizardForm);

