class Api::V1::MyJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
  	if current_user.present?
	    @q = current_user.jobs.ransack(params[:q])
	    @jobs = @q.result.order(created_at: :desc)
	end
  end
end
