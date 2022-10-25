class Api::V1::InvitedOpennedJobsController < ApplicationController
  before_action :authenticate_user!
  def index
    @openned_jobs = current_user.jobs.where(state: :open).or(current_user.jobs.where(state: :invited)).order(created_at: :desc)
  end

end
