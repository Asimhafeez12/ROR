class Api::V1::UserSkillsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_skills = User.find(params[:user_id]).skill_list
  end
end
