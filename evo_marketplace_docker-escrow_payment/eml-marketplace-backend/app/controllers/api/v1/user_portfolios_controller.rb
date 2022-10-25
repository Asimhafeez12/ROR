class Api::V1::UserPortfoliosController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

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
end
