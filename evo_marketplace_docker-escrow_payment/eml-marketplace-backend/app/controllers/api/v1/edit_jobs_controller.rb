class Api::V1::EditJobsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def update
  	(@job = current_user.jobs.find(params[:id])).update(permitted_params)
  end

  protected
  def permitted_params
    params.require(:job).permit(:title, :job_category_id, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :deadline, :terms_and_conditions, :job_category_id, job_files_attributes: [:avatar])
  end
end
