class Api::V1::LastJobsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  	@job = Job.last
  end
end
