class Api::V1::JobsController < ApplicationController
  before_action :authenticate_user!
  before_action :job, only: [:show, :update]
  skip_before_action :verify_authenticity_token

  def job
    @job = Job.find(params[:id])
  end

  def show
    @job = Job.find(params[:id])
  end
  
  def update
  	job.update(permitted_params); job.project_milestones.update_all(is_delivered: true); render json: job
  end

  private
  def permitted_params
  	params.require(:job).permit(:state_event)
  end
end
