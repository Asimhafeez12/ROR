class Api::V1::JobCreationWizardsController < ApplicationController
  skip_before_action :verify_authenticity_token
  after_action :send_notification_to_client_after_job_creation, only: [:create]

  def create
    (@job = current_user.jobs.build(permitted_params)).save if current_user.present?
  end

  protected
  def permitted_params
    params.require(:job).permit(:title, :category, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :job_category_id, job_files_attributes: [:avatar])
  end

  def send_notification_to_client_after_job_creation
    Notification.create(user_id: current_user.id, recipient_id: @job.user_id, action: "notifications.job.created", notifiable_type: "Job", notifiable_id: @job.id) if User.find(@job.user_id).job_posted == true
    MyMailer.job_posted(@job).deliver_later if User.find(@job.user_id).job_posted_email == true
    MyMailer.client_registered(current_user, @job).deliver_later
  end
end
