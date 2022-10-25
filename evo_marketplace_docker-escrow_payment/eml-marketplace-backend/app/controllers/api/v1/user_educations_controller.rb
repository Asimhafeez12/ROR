class Api::V1::UserEducationsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @user_educations = User.find(params[:user_id]).user_educations
  end

  def create
    (@user_education = user.user_educations.build(permitted_params)).save
  end

  def update
    (@user_education = user.user_educations.find(params[:id])).update(permitted_params)
  end

  def destroy
    user.user_educations.find(params[:id]).delete
    @user_educations = user.user_educations
  end

  private
  def user
    @user = current_user
  end
  
  def permitted_params
    params.require(:user_education).permit(:degree_name, :starting_date, :institute_name, :description, :ending_date)
  end
end
