class Api::V1::RejectInvitedFreelancersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :add_user_to_rejected_freelancers, only: [:create]

  def create
    (@job = Job.find(params[:job_id])).update(permitted_params)
  end
  private
  def job
    Job.find(params[:job_id])
  end
  def permitted_params
    params.require(:job).permit(:state)
  end
  def add_user_to_rejected_freelancers
    OptedFreelancer.where(user_id: current_user.id, job_id: job.id).delete_all
    RejectedFreelancer.create(user_id: current_user.id, job_id: job.id, description: params[:job][:description])
  end
end
