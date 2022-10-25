class Api::V1::RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    (@user = User.new(permitted_params)).save; 
    if params[:job].present? && @user.present?
      @job = Job.create(user_id: @user.id);
      (@job = @job).update(job_permitted_params);
      MyMailer.job_posted(@job).deliver_later
      MyMailer.client_registered(@user, @job).deliver_later
    else
      MyMailer.freelancer_registered(@user).deliver_now
    end
  end

  def update
    if params[:user][:current_password] && current_user.valid_password?(params[:user][:current_password])
      (@user = current_user).update(permitted_params)
      MyMailer.password_updated_successfully(@user).deliver_later if params[:user][:password].present?
    else
      render json: {  errors: [{current_password: "Incorrect password"}]  }
    end
  	
  end

  protected
  def permitted_params
    params.require(:user).permit!
  end
  
  def job_permitted_params
    params.require(:job).require(:job).permit(:title, :description, :minimum_budget, :skill_list, :starting_date, :availability, :duration, :additional_info, :desired_profile, :job_category_id, job_files_attributes: [:avatar])
  end

end
