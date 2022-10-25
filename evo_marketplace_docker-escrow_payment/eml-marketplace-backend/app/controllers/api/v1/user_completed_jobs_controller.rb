class Api::V1::UserCompletedJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_completed_jobs = User.find(params[:user_id]).accepted_jobs.where(state: :completed)
  end
end
