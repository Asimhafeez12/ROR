class Api::V1::JobRatingsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  after_action :send_notifications_to_client_and_freelancers_after_job_rating, only: [:create]
  
  def show
    @job_rating = JobRating.find_by(user_id: params[:id], job_id: params[:job_id])
  end

   def create
   	@job_rating = JobRating.find_by(job_id: params[:job_id], user_id: params[:user_id])
    @job_rating = JobRating.create(job_id: params[:job_id]) if @job_rating.nil?
    (@job_rating = @job_rating).update(permitted_params)
  end

  private

  def job
    @job = Job.find(params[:job_id])
  end

  def user
    @user = User.find(params[:user_id])
  end

  def permitted_params
    params.require(:job_rating).permit(:user_id, :accuracy, :value, :deadline, :communication, :quality, :availability, :overall_rating, :review, :feedback)
  end

  def send_notifications_to_client_and_freelancers_after_job_rating  
    Notification.create(user_id: current_user.id, action: "notifications.job.rating", recipient_id: user.id, notifiable_type: "Job", notifiable_id: job.id) 
  end

end
