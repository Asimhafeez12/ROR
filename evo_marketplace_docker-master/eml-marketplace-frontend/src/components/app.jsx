import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './layouts/header';
import SignIn from './auth/sign_in';
import NewPassword from './auth/new_password';
import EditPassword from './auth/edit_password';
import ForgotPassSuccess from './auth/forgot_pass_success';
import EmailConfirmation from './auth/email_confirmation';
import FreelancerProfile from './../components/freelancer';
import ClientProfileSetupWizard from './clients/profile_setup_wizard';
import JobCreation from './job_creation';
import EditJob from './edit_job';
import AddReviewRating from './add_review_rating';
import EditJobCategory from './edit_job_category';
import JobCategory from './job_categories';
import MyJobs from './jobs/my';
import ViewJob from './jobs/view';
import MyNotifications from './my_notifications';
import UserChatroom from './chats/user_chats';
import Chatroom from './chats/chatroom';
import JobDetails from './jobs/job_details';
import '../css/application.css';
import Defender from './../helpers/defender';
import FreelancerSignUp from './freelancer/sign_up';
import ClientSetting from './setting';
import FreelancerSetting from './setting';
import hireFreelancer from './hire';
import homePage from './static-pages';
import homePage2 from './static-pages/index2';
import howItWork from './static-pages/how-it-work';
import Evaluation from './static-pages/evaluation';
import workWithFreelancer from './static-pages/work-with-freelancers';
import forFreelancer from './static-pages/for-freelancers';
import Blog from './static-pages/blog';
import allPosts from './static-pages/blog/all-posts';
import singlePost from './static-pages/blog/single-post';
import aboutUs from './static-pages/about-us';
import contactUs from './static-pages/contact-us';
import PrivacyPolicy from './static-pages/privacy_policy';
import CodeOfConduct from './static-pages/code_of_conduct';
import FeeAndServiceAgreement from './static-pages/fee_and_service_agreement';
import IntellectualPropertyRights from './static-pages/intellectual_property_rights';
import CookiePolicy from './static-pages/cookie_policy';
import TermsofService from './static-pages/terms_of_service';
import Sitemap from './static-pages/sitemap';
import ClientDashboard from './dashboard/client';
import FreelancerDashboard from './dashboard/freelancer';
import Error404 from './static-pages/error-404';
import ImageCropping from './static-pages/image-cropping';



const notAuthenticatedDashboard = () => {
	if (!!Defender.currentUser()) {
		if (Defender.currentUser()._r.includes('client') && !Defender.currentUser().is_c_profile_setup) {
			return <Redirect to="/client_wizard_profile" />
		}
		else{
			return <Redirect to="/" />
		}
	}
	else{
		return <Redirect to="/sign_in" />
	}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!!Defender.currentUser() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/sign_in",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

const App = () => (
	<Layout>
		<Header />
		<Layout.Content>
			<PrivateRoute path='/client_wizard_profile' component={ClientProfileSetupWizard} />
			<PrivateRoute path='/profile/:id' component={FreelancerProfile} />
			<PrivateRoute path='/edit_job/:id' component={EditJob} />
			<PrivateRoute path='/add_review_rating/:id' component={AddReviewRating} />
			<PrivateRoute path='/edit_job_category/:id' component={EditJobCategory} />
			<PrivateRoute path='/jobs' component={MyJobs} />
			<PrivateRoute path='/all_notifications' component={MyNotifications} />
			<PrivateRoute path='/job/:id' component={ViewJob} />
			<PrivateRoute path='/job_details/:id' component={JobDetails} />
			<PrivateRoute path='/client/settings' component={ClientSetting} />
			<PrivateRoute path='/freelancer/settings' component={FreelancerSetting} />
			<PrivateRoute path='/messages' component={Chatroom} />
			<PrivateRoute path='/hire-freelancer' component={hireFreelancer} />
			<PrivateRoute path='/hire_freelancer/:job_id/user/:user_id' component={hireFreelancer} />
			<Route exact path='/client' component={ClientDashboard} />
			<Route exact path='/freelancer' component={FreelancerDashboard} />
			<Route exact path='/job_category' component={JobCategory} />
			<Route exact path='/job_creation/:job_category' component={JobCreation} />
			<Route exact path='/job_creation' component={JobCreation} />
			<Route exact path='/dashboard' render={notAuthenticatedDashboard} />
			<Route exact path='/freelancer/sign_up' component={FreelancerSignUp} />
			<Route exact path='/sign_in' component={SignIn} />
			<Route exact path='/password/reset' component={NewPassword} />
			<Route exact path='/password/edit/:reset_password_token' component={EditPassword} />
			<Route exact path='/reset_password_email_sent' component={ForgotPassSuccess} />
			<Route exact path='/confirmation/:id/mail/:confirmation_token' component={EmailConfirmation} />
			<Route exact path='/' component={homePage} />
			<Route exact path='/home2' component={homePage2} />
			<Route exact path='/how-it-work' component={howItWork} />
			<Route exact path='/evaluation' component={Evaluation} />
			<Route exact path='/work-with-freelancers' component={workWithFreelancer} />
			<Route exact path='/blog' component={Blog} />
			<Route exact path='/blog/all-posts' component={allPosts} />
			<Route exact path='/blog/single-post' component={singlePost} />
			<Route exact path='/for-freelancers' component={forFreelancer} />
			<Route exact path='/about-us' component={aboutUs} />
			<Route exact path='/contact-us' component={contactUs} />
			<Route exact path='/privacy_policy' component={PrivacyPolicy} />
			<Route exact path='/code_of_conduct' component={CodeOfConduct} />
			<Route exact path='/fee_and_service_agreement' component={FeeAndServiceAgreement} />
			<Route exact path='/intellectual_property_rights' component={IntellectualPropertyRights} />
			<Route exact path='/cookie_policy' component={CookiePolicy} />
			<Route exact path='/terms_of_service' component={TermsofService} />			
			<Route exact path='/sitemap' component={Sitemap} />
			<Route exact path='/error-404' component={Error404} />
			<Route exact path='/image-cropping' component={ImageCropping} />
		
			<UserChatroom />
		</Layout.Content>
	</Layout>
)
export default App;
