class Api::V1::FreelancerActiveJobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def index
    @active_jobs = Job.where('id in (?)',AcceptFreelancer.where(user_id: params[:user_id]).pluck(:job_id).uniq).where(state: "active").order(created_at: :desc)
  end
end