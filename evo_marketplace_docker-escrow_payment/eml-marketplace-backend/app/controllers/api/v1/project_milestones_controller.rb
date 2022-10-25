class Api::V1::ProjectMilestonesController < ApplicationController
  after_action :send_notifications_to_client_and_freelancers_after_milestone_creation, only: [:create]
  after_action :send_notifications_to_client_and_freelancers_after_milestone_updation, only: [:update]
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def index
    @project_milestones = job.project_milestones
  end
  def create
    (@project_milestone = job.project_milestones.build(permitted_params)).save
  end
  def update
    (@project_milestone = job.project_milestones.find(params[:id])).update(permitted_params)
  end
  def destroy
    job.project_milestones.find(params[:id]).delete
    @project_milestones = job.project_milestones
  end
  private
  def job
    @job = Job.find(params[:job_id])
  end
  def permitted_params
    params.require(:project_milestone).permit(:user_id, :closing_date, :title, :price, :is_delivered, :description)
  end
  def send_notifications_to_client_and_freelancers_after_milestone_creation
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.created", notifiable_type: "Job", notifiable_id: job.id)
  end
  def send_notifications_to_client_and_freelancers_after_milestone_updation
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.closed", notifiable_type: "Job", notifiable_id: job.id)
  end
  def send_notifications_to_client_and_freelancers_after_milestone_creation
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.created", notifiable_type: "Job", notifiable_id: job.id)
  end
  def send_notifications_to_client_and_freelancers_after_milestone_updation
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.closed", notifiable_type: "Job", notifiable_id: job.id)
  end
end
