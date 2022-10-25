class Api::V1::JobCategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @job_categories = JobCategory.all
  end

  def show
  	@job_category = JobCategory.find(params[:id])
  end
end
