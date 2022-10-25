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
    job.update(closing_date: Date.today)
    if current_user._r.include? 'client' 
      job.update(state: 'completed'); job.project_milestones.update_all(is_delivered: true); 
      Notification.create(user_id: current_user.id, action: "notifications.job.completed", recipient_id: job.user_id, notifiable_type: "Job", notifiable_id: job.id) if User.find(job.user_id).job_closed == true
      MyMailer.job_closed_successfully(job, user, @job_rating).deliver_later if User.find(job.user_id).job_closed_email == true
      Notification.create(user_id: current_user.id, action: "notifications.job.rating", recipient_id: user.id, notifiable_type: "Job", notifiable_id: job.id) if User.find(user.id).rating_received == true 
      MyMailer.job_completed(job, user, @job_rating).deliver_later if User.find(user.id).rating_received_email == true 
    else
      Notification.create(user_id: current_user.id, action: "notifications.job.rating", recipient_id: job.user_id, notifiable_type: "Job", notifiable_id: job.id) if User.find(job.user_id).rating_received == true 
      MyMailer.job_completed_by_freelancer(job, current_user, @job_rating).deliver_later if User.find(current_user_id).job_closed_email == true
      Notification.create(user_id: current_user.id, action: "notifications.job.completed", recipient_id: current_user.id, notifiable_type: "Job", notifiable_id: job.id) if User.find(current_user.id).job_closed == true
      MyMailer.rating_given_by_freelancer(job, current_user, @job_rating).deliver_later if User.find(job.user_id).rating_received_email == true 
    end 
  end

end
