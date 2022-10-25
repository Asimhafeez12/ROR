class Api::V1::FreelancerCompletedJobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  #before_action :authenticate_user!
  def index
    @completed_jobs = Job.where('id in (?)',AcceptFreelancer.where(user_id: params[:user_id]).pluck(:job_id).uniq).where(state: "completed").order(created_at: :desc)
  end
end
