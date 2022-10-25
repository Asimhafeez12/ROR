class Api::V1::UserBillingsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    @user_blling = UserBilling.find_by(user_id: params[:user_id])
    @user_blling = UserBilling.create(user_id: params[:user_id]) if @user_blling.nil?
    (@user_blling = @user_blling).update(permitted_params)
  end

  def show
    @user_billing = UserBilling.find(params[:id])
  end

  protected
  def permitted_params
    params.require(:user_billing).permit(:first_name, :last_name, :country, :address, :city, :zip_code, :send_invoice)
  end

end
