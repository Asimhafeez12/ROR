class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    (@user = current_user).update(permitted_params)
  end

  def show
    @user = User.find(params[:id])
  end

  protected
  def permitted_params
    params.require(:user).permit(:phone_number, :country, :avatar, :is_not_active, :deactivation_reason, :security_question, :security_answer, :first_name, :last_name, :escrow_knowledge, :city)
  end

end
