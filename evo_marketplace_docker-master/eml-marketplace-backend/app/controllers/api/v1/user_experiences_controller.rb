class Api::V1::UserExperiencesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  after_action :update_profile_score, only: [:create]
  after_action :decrease_profile_score, only: [:destroy]

  def index
    @user_experiences = User.find(params[:user_id]).user_experiences
  end

  def create
    (@user_experience = user.user_experiences.build(permitted_params)).save
  end

  def update
    (@user_experience = user.user_experiences.find(params[:id])).update(permitted_params)
  end

  def destroy
    user.user_experiences.find(params[:id]).delete
    @user_experiences = user.user_experiences
  end


  private
  def user
    @user = current_user
  end
  
  def permitted_params
    params.require(:user_experience).permit(:designation, :starting_date, :organization_name, :description, :ending_date)
  end

  def update_profile_score
    if current_user.user_experiences.count == 1
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score + 10;
      current_user.update(profile_score: @current_user_score)
    end
  end

  def decrease_profile_score
    if current_user.user_experiences.count == 0
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score - 10;
      current_user.update(profile_score: @current_user_score)
    end
  end
end
