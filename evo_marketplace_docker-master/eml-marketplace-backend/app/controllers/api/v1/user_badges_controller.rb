class Api::V1::UserBadgesController < ApplicationController

  skip_before_action :verify_authenticity_token
  #before_action :authenticate_user!

  def index
    @user_badges = User.find(params[:user_id]).badges
  end
end
