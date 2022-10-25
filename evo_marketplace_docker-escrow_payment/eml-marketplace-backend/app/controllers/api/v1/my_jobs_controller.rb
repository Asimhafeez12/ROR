class Api::V1::MyJobsController < ApplicationController

  def index
    @q = current_user.jobs.ransack(params[:q])
    @jobs = @q.result.order(created_at: :desc)
  end
end
