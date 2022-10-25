class Api::V1::ClientOpennedJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def show
    @openned_jobs_length = current_user.openned_jobs_length
  end

end
