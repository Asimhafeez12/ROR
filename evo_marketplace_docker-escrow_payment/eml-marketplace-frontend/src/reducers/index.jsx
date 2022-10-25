import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import registerReducer from './auth/registrations';
import logInReducer from './auth/sign_in';
import newPasswordReducer from './auth/new_password';
import editPasswordReducer from './auth/edit_password';
import authReducer from './auth';
import clientProfileWizardReducer from './client_profile_wizard';
import jobCreationWizard from './job_creation_wizard';
import jobUpdateReducer from './update_job';
import AvatarReducer from './avatar'; 
import MyJobsReducer from './jobs/my';
import FreelancerReducer from './freelancer_profile';
import jobViewReducer from './jobs/view';
import userViewReducer from './users';
import UserCertificateReducer from './users/user_certificates';
import UserEducationReducer from './users/user_educations';
import UserPortfolioReducer from './users/user_portfolios';
import UserExperienceReducer from './users/user_experiences';
import UserBillingReducer from './users/user_billings';
import UserSkillsReducer from './users/user_skills';
import UserLanguagesReducer from './users/user_languages';
import UserExpertiseReducer from './users/user_expertise';
import UserInvitedJobsReducer from './users/user_invited_jobs';
import UserAcceptedJobsReducer from './users/user_accepted_jobs';
import UserCompletedJobsReducer from './users/user_completed_jobs';
import jobCategoryViewReducer from './job_categories/view';
import invitedFreelancerReducer from './jobs/invited_freelancers';
import notificationsReducer from './notifications';
import UsersChatroomReducer from './users_chatroom';
import ChatMessagesReducer from './chat_messages';
import ReadMessagesReducer from './read_messages';
import UnreadMessagesReducer from './unread_messages';
import InvitedOpenJobsReducer from './invited_openned_jobs';
import AcceptedFreelancersReducer from './accepted_freelancers';
import InvitedActiveJobsReducer from './invited_active_jobs';
import InvitedCompletedJobsReducer from './invited_completed_jobs';
// import AcceptedJobsReducer from './accepted_jobs';
import AcceptedJobsReducer from './accepted_jobs';
import JobMilestoneReducer from './job_milestones';
import SkillsReducer from './skills';
import LanguagesReducer from './languages';
import MyChatroomsReducer from './my_chatrooms';
import AllChatroomsReducer from './all_chatrooms';
import JobCategoryReducer from './job_categories';
import JobAdvisorReducer from './job_advisors';
import Freelancer from './dashboard/freelancer';
import JobCoverLetterReducer from './job_cover_letter';
import freelancerjobRatingReducer from './freelancer_job_ratings';
import clientjobRatingReducer from './client_job_ratings';
import registerFLReducer from './freelancer_signup'
import FLRPersonalInformation from './auth/registrations/personal_information';
import FreelancerActiveJobsReducer from './freelancer_active_jobs';
import FreelancerCompletedJobsReducer from './freelancer_completed_jobs';
import FreelancerInvitedJobsReducer from './freelancer_invited_jobs';
import FLRCertification from './auth/registrations/certification';
import FLRExperience from './auth/registrations/experience';
import ClientActiveJobsReducer from './client_active_jobs';
import ClientOpennedJobsReducer from './client_openned_jobs';

export default combineReducers({
  FLRExperience: FLRExperience,
  FLRCertification: FLRCertification,
  FLRPersonalInformation: FLRPersonalInformation,
  registerFLReducer: registerFLReducer,
  skills_reducer: SkillsReducer,
  languages_reducer: LanguagesReducer,
  job_milestones_reducer: JobMilestoneReducer,
  invited_active_jobs_reducer: InvitedActiveJobsReducer,
  accepted_freelancers_reducer: AcceptedFreelancersReducer,
  invited_openned_jobs_reducer: InvitedOpenJobsReducer,
  invited_completed_jobs_reducer: InvitedCompletedJobsReducer,
  // accepted_jobs_reducer : AcceptedJobsReducer,
  accepted_jobs_reducer : AcceptedJobsReducer,
  chat_messages_reducer: ChatMessagesReducer,
  read_messages_reducer: ReadMessagesReducer,
  unread_messages_reducer: UnreadMessagesReducer,
  userchatroom_reducer: UsersChatroomReducer,
  notifications_reducer: notificationsReducer,
  invited_freelancers_reducer: invitedFreelancerReducer,
  job_view_reducer: jobViewReducer,
  user_view_reducer: userViewReducer,
  my_jobs_reducer: MyJobsReducer,
  avatar: AvatarReducer,
  client_profile_wizard: clientProfileWizardReducer,
  job_creation_wizard: jobCreationWizard,
  auth: authReducer,
  routing: routerReducer,
  registerReducer,
  logInReducer,
  newPasswordReducer,
  editPasswordReducer,
  freelancerProfile: FreelancerReducer,
  my_chatrooms_reducer: MyChatroomsReducer,
  all_chatrooms_reducer: AllChatroomsReducer,
  job_categories_reducer: JobCategoryReducer,
  job_category_view_reducer: jobCategoryViewReducer,
  update_job_reducer: jobUpdateReducer,
  user_certificates_reducer: UserCertificateReducer,
  user_educations_reducer: UserEducationReducer,
  user_portfolios_reducer: UserPortfolioReducer,
  user_experiences_reducer: UserExperienceReducer,
  user_billings_reducer: UserBillingReducer,
  user_skills_reducer: UserSkillsReducer,
  user_languages_reducer: UserLanguagesReducer,
  user_expertise_reducer: UserExpertiseReducer,
  user_invited_jobs_reducer: UserInvitedJobsReducer,
  user_accepted_jobs_reducer: UserAcceptedJobsReducer,
  user_completed_jobs_reducer: UserCompletedJobsReducer,
  job_advisors_reducer: JobAdvisorReducer,
  freelancer_reducer: Freelancer,
  job_cover_letter_reducer: JobCoverLetterReducer,
  freelancerjobRatingReducer: freelancerjobRatingReducer,
  clientjobRatingReducer: clientjobRatingReducer,
  freelancer_active_jobs_reducer: FreelancerActiveJobsReducer,
  freelancer_completed_jobs_reducer: FreelancerCompletedJobsReducer,
  freelancer_invited_jobs_reducer: FreelancerInvitedJobsReducer,
  client_active_jobs_reducer: ClientActiveJobsReducer,
  client_openned_jobs_reducer: ClientOpennedJobsReducer
});

