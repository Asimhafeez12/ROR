class Api::V1::InvitedCompletedJobsController < ApplicationController
  before_action :authenticate_user!
  after_action :send_notifications_to_client_and_freelancers_after_job_completion, only: [:update]
  def index
    @jobs_completed = accepted_jobs.where(state: :completed).order(created_at: :desc)
  end

  def update
    (@job = current_user.jobs.find(params[:job_id])).update(permitted_params)
  end

  def completed_jobs
    (_ = current_user).has_role?(:client) && _.jobs || _.completed_jobs
  end

  def accepted_jobs
    (_ = current_user).has_role?(:client) && _.jobs || _.accepted_jobs
  end

  def job
    @job = Job.find(params[:job_id])
  end

  private
  def permitted_params
    params.require(:job).permit(:state_event, :event, :state) 
  end
  
end
