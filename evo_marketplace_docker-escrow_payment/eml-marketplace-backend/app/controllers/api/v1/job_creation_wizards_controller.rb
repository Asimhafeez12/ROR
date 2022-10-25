class Api::V1::JobCreationWizardsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    (@job = current_user.jobs.build(permitted_params)).save if current_user.present?
  end

  protected
  def permitted_params
    params.require(:job).permit(:title, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :job_category_id, job_files_attributes: [:avatar])
  end
end
