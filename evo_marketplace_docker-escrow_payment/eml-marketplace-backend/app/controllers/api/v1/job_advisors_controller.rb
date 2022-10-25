class Api::V1::JobAdvisorsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def create
    (@job_advisor = JobAdvisor.new(permitted_params)).save
  end
  
  def permitted_params
    params.require(:job_advisor).permit(:full_name, :email, :phone_number, :skype_id, :available_date, :available_time)
  end
end
