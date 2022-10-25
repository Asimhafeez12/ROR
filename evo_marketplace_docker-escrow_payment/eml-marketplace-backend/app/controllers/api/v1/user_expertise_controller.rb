class Api::V1::UserExpertiseController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_expertise = User.find(params[:user_id]).expertise_list
  end
end
