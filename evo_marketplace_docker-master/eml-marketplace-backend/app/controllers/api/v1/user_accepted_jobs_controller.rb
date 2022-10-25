class Api::V1::UserAcceptedJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_accepted_jobs = User.find(params[:user_id]).accepted_jobs.where(state: :active)
  end
end
