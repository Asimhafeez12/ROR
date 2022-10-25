class Api::V1::JobCoverLettersController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  after_action :send_notification_to_freelancer_after_job_cover_letter_submission, only: [:create]

  def create
    (@job_cover_letter = JobCoverLetter.new(permitted_params)).save
  end

  def show
  	@job_cover_letter = JobCoverLetter.find_by(user_id: params[:id], job_id: params[:job_id])
  end

  private

  def job
    @job = Job.find(params[:job_id])
  end

  def user
    @user = User.find(params[:id])
  end

  protected
  
  def permitted_params
    params.require(:job_cover_letter).permit(:expected_amount, :expected_timeline, :cover_letter, :user_id, :job_id)
  end

  def send_notification_to_freelancer_after_job_cover_letter_submission
    Notification.create(user_id: current_user.id, recipient_id: current_user.id, action: "notifications.job.cover.created.freelancer", notifiable_type: "Job", notifiable_id: job.id) if User.find(current_user.id).cover_letter_submitted == true
    MyMailer.cover_letter_received(@job_cover_letter).deliver_later if User.find(current_user.id).cover_letter_submitted_email == true
  end
end
