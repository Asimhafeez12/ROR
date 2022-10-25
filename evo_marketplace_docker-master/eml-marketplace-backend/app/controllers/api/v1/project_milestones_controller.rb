class Api::V1::ProjectMilestonesController < ApplicationController
  after_action :send_notifications_to_client_and_freelancers_after_milestone_creation, only: [:create]
  after_action :update_job_type, only: [:create]
  after_action :update_approval_status_on_closing_of_milestone, only: [:update]
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def index
    @project_milestones = job.project_milestones.order("created_at asc")
  end
  def create
    (@project_milestone = job.project_milestones.build(permitted_params)).save
  end
  def update
    (@project_milestone = job.project_milestones.find(params[:id])).update(permitted_params)
    milestone_params && milestone_params[:is_delivered] && Escrow::AcceptTransaction.new(@project_milestone).response
  end
  def destroy
    job.project_milestones.find(params[:id]).delete
    @project_milestones = job.project_milestones
  end
  private
  def job
    @job = Job.find(params[:job_id])
  end
  def milestone_params
    permitted_params[:project_milestone]
  end
  def permitted_params
    params.require(:project_milestone).permit(:user_id, :closing_date, :title, :price, :is_delivered, :description, :approval_status, :is_accepted)
  end
  def send_notifications_to_client_and_freelancers_after_milestone_creation
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.created", notifiable_type: "Job", notifiable_id: job.id) if User.find(@project_milestone.user_id).milestone_created == true
    Notification.create(user_id: current_user.id, recipient_id: current_user.id, action: "notifications.job.milestone.created", notifiable_type: "Job", notifiable_id: job.id) if User.find(current_user.id).milestone_created == true
  end
  def update_approval_status_on_closing_of_milestone
    @project_milestone.update(approval_status: "approved") if params[:project_milestone][:is_delivered].present?
  end

  def update_job_type
    job.project_milestones.first.delete if job.job_type == "full" && job.project_milestones.count == 1
    job.update(job_type: "milestone_based")
  end
end
