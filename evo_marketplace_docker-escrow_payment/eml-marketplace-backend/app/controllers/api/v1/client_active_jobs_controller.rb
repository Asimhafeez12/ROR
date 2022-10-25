class Api::V1::ClientActiveJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def show
    @active_jobs_length = current_user.active_jobs_length
  end

end
