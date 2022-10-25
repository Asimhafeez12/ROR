class Api::V1::JobCategoriesController < ApplicationController
  #before_action :authenticate_user!

  def index
    @job_categories = JobCategory.all
  end

  def show
  	@job_category = JobCategory.find(params[:id])
  end
end
