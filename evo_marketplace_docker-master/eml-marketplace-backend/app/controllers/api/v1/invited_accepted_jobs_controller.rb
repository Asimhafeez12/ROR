class Api::V1::InvitedAcceptedJobsController < ApplicationController
  before_action :authenticate_user!
  def index
    @jobs_invitations = accepted_jobs.where(state: :active).order(created_at: :desc)
  end

  def accepted_jobs
    (_ = current_user).has_role?(:client) && _.jobs || _.accepted_jobs
  end
end
