class Api::V1::UserInvitedJobsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_invited_jobs = User.find(params[:user_id]).jobs_invitations.where(state: :open)
  end
end
