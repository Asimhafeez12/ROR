class Api::V1::FreelancerInvitedJobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  def index
    @invited_jobs = Job.where('id in (?)',InvitedUserJob.where(user_id: current_user.id).pluck(:job_id).uniq).where(state: "open").order(created_at: :desc)
  end
end
