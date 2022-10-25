class Api::V1::AcceptInvitedFreelancersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :send_notifications_to_client_after_job_initiation, only: [:create]
  def index
    @accepted_freelancers = current_user.jobs.find(params[:job_id]).accept_freelancers
  end
  def create
    (@job = current_user.jobs.find(params[:job_id])).update(permitted_params)
  end
  private
  def job
    Job.find(params[:job_id])
  end
  def permitted_params
    params.require(:job).permit(:state_event, :event, :state, accept_freelancers_attributes: [:user_id])
  end
  def send_notifications_to_client_after_job_initiation
    Notification.create(user_id: current_user.id, action: "notifications.openned.job.now.active", recipient_id: current_user.id, notifiable_type: "Job", notifiable_id: job.id)  
  end
end
