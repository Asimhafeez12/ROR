class Api::V1::HomeIllustrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @home_illustrations = HomeIllustration.all
  end

  def show
  	@home_illustration = HomeIllustration.find(params[:id])
  end
end
