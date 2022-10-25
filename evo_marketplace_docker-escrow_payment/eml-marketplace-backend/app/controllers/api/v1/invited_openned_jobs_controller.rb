class Api::V1::InvitedOpennedJobsController < ApplicationController
  before_action :authenticate_user!
  def index
    @jobs_invitations = current_user.jobs_invitations.where(state: :open).order(created_at: :desc)
  end

end
