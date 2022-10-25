class Api::V1::ValidateFreelancersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    user = User.new(permitted_params)
    user.valid?
    render json: { success: user.errors[:email].blank? }
  end
  private
  def permitted_params
    params.require(:validate_freelancer).permit![:user]
  end
end
