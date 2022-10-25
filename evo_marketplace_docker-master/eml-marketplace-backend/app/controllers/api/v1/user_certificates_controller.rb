class Api::V1::UserCertificatesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  after_action :update_profile_score, only: [:create]
  after_action :decrease_profile_score, only: [:destroy]

  def index
    @user_certificates = User.find(params[:user_id]).user_certificates
  end

  def create
    (@user_certificate = user.user_certificates.build(permitted_params)).save
  end

  def update
    (@user_certificate = user.user_certificates.find(params[:id])).update(permitted_params)
  end

  def destroy
    user.user_certificates.find(params[:id]).delete
    @user_certificates = user.user_certificates
  end

  private
  def user
    @user = current_user
  end
  
  def permitted_params
    params.require(:user_certificate).permit(:title, :starting_date, :institution_name, :description, :ending_date)
  end

  def update_profile_score
    if current_user.user_certificates.count == 1
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score + 10;
      current_user.update(profile_score: @current_user_score)
    end
  end

  def decrease_profile_score
    if current_user.user_certificates.count == 0
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score - 10;
      current_user.update(profile_score: @current_user_score)
    end
  end
end
