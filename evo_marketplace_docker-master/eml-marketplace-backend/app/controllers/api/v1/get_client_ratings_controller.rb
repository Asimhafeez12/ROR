class Api::V1::GetClientRatingsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  
  def show
    @job_rating = JobRating.find_by(user_id: job.user_id, job_id: job.id)
  end

  private

  def job
    @job = Job.find(params[:job_id])
  end

end
