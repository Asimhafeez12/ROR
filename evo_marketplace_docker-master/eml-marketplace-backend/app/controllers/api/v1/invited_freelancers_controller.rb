class Api::V1::InvitedFreelancersController < ApplicationController
  before_action :authenticate_user!
  def index
  	@job = current_user.jobs.find(params[:job_id])
    @invited_freelancers = current_user.jobs.find(params[:job_id]).invited_user_jobs
  end
end
