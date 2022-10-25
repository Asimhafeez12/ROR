class Api::V1::OptInvitedFreelancersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  def index
    @opted_freelancers = current_user.jobs.find(params[:job_id]).opted_freelancers
  end
  def create
    (@job = current_user.jobs.find(params[:job_id])).update(permitted_params)
  end
  private
  def job
    Job.find(params[:job_id])
  end
  def permitted_params
    params.require(:job).permit(:state_event, :event, :state, opted_freelancers_attributes: [:user_id])
  end
end
