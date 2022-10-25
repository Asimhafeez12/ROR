class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :send_notification_after_account_deactivation, only: [:create]

  def create
    (@user = current_user).update(permitted_params)
  end

  def show
    @user = User.find(params[:id])
  end

  protected
  def permitted_params
    params.require(:user).permit(:phone_number, :country, :avatar, :is_not_active, :deactivation_reason, :security_question, :security_answer, :first_name, :last_name, :escrow_knowledge, :city, :job_posted, :job_posted_email, :job_approved, :job_approved_email, :cover_letter_received, :cover_letter_received_email, :job_offer_sent, :job_offer_sent_email, :job_offer_accepted, :job_offer_accepted_email, :job_offer_rejected, :job_offer_rejected_email, :milestone_created, :milestone_created_email, :milestone_accepted, :milestone_accepted_email, :milestone_agreed_by_freelancer, :milestone_agreed_by_freelancer_email, :milestone_accepted_on_escrow, :milestone_accepted_on_escrow_email, :milestone_delivered, :milestone_delivered_email, :milestone_received, :milestone_received_email, :payment_approved, :payment_approved_email, :invitation_received, :invitation_received_email, :cover_letter_submitted, :cover_letter_submitted_email, :job_offer_received, :job_offer_received_email, :job_started, :job_started_email, :job_closed, :job_closed_email, :rating_given, :rating_given_email, :rating_received, :rating_received_email, :unread_messages_interval)
  end

  def send_notification_after_account_deactivation
    MyMailer.account_deactivated_successfully(@user).deliver_later if params[:user][:deactivation_reason].present?
  end

end
