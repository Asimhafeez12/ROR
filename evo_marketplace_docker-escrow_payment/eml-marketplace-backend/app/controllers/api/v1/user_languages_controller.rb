class Api::V1::UserLanguagesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_languages = User.find(params[:user_id]).language_list
  end
end
