class Api::V1::UpdateClientWizardsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    (@user = current_user).update(permitted_params)
  end
  
  protected
  def permitted_params
    params.require(:user).permit(:phone_number, :country, :avatar, :city, :title)
  end
end
