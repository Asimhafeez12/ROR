class Api::V1::UserPortfoliosController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  after_action :update_profile_score, only: [:create]
  after_action :decrease_profile_score, only: [:destroy]

  def index
    @user_portfolios = User.find(params[:user_id]).user_portfolios
  end

  def create
    (@user_portfolio = user.user_portfolios.build(permitted_params)).save
  end

  def update
    (@user_portfolio = user.user_portfolios.find(params[:id])).update(permitted_params)
  end

  def destroy
    user.user_portfolios.find(params[:id]).delete
    @user_portfolios = user.user_portfolios
  end

  private
  def user
    @user = current_user
  end
  
  def permitted_params
    params.require(:user_portfolio).permit(:title, :link, :avatar)
  end

  def update_profile_score
    if current_user.user_portfolios.count == 1
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score + 10;
      current_user.update(profile_score: @current_user_score)
    end
  end

  def decrease_profile_score
    if current_user.user_portfolios.count == 0
      @current_user_score = current_user.profile_score
      @current_user_score = @current_user_score - 10;
      current_user.update(profile_score: @current_user_score)
    end
  end
end
