class Api::V1::RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    (@user = User.new(permitted_params)).save; 
    if params[:job].present? && @user.present?
      @job = Job.create(user_id: @user.id);
      (@job = @job).update(job_permitted_params);
    end
  end

  def update
  	(@user = current_user).update(permitted_params)
  end

  protected
  def permitted_params
    params.require(:user).permit!
  end
  
  def job_permitted_params
    params.require(:job).require(:job).permit(:title, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :job_category_id, job_files_attributes: [:avatar])
  end
end
