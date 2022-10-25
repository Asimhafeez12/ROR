class Api::V1::EditJobsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :create_milestone_if_job_type_is_full, only: [:update]
  #after_action :send_notification_to_client_after_job_update, only: [:update]

  def update
  	(@job = current_user.jobs.find(params[:id])).update(permitted_params)
  end

  protected
  def permitted_params
    params.require(:job).permit(:title, :category, :job_category_id, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :deadline, :job_category_id, :job_type, job_files_attributes: [:avatar])
  end

  def create_milestone_if_job_type_is_full
    ProjectMilestone.create(title: params[:job][:milestone_title], description: @job.description, user_id: params[:job][:milestone_user_id], closing_date: Date.today + 2.days, price_cents: @job.minimum_budget * 100, is_accepted: false, job_id: @job.id) if params[:job][:job_type] == "full"
  end

  def send_notification_to_client_after_job_update
    Notification.create(user_id: current_user.id, recipient_id: @job.user_id, action: "notifications.job.update", notifiable_type: "Job", notifiable_id: @job.id)
  end
end
