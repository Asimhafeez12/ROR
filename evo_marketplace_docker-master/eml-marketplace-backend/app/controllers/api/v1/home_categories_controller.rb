class Api::V1::HomeCategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @home_categories = HomeCategory.all
  end

  def show
  	@home_category = HomeCategory.find(params[:id])
  end
end
