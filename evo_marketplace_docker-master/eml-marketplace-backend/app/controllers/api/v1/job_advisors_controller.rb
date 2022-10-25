class Api::V1::JobAdvisorsController < ApplicationController

  skip_before_action :verify_authenticity_token
  #before_action :authenticate_user!
  after_action :send_notification_to_admins, only: [:create]

  def create
    (@job_advisor = JobAdvisor.new(permitted_params)).save
  end
  
  def permitted_params
    params.require(:job_advisor).permit(:full_name, :email, :phone_number, :skype_id, :available_date, :available_time)
  end

  def send_notification_to_admins
    MyMailer.job_consultation(@job_advisor).deliver_later
    MyMailer.job_consultation_to_user(@job_advisor).deliver_later
  end

end
