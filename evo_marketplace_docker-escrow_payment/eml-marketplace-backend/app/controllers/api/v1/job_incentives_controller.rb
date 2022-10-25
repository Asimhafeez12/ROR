class Api::V1::JobIncentivesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

   def create
    (@job_incentive = job.job_incentives.build(permitted_params)).save
  end

  private

  def job
    @job = Job.find(params[:job_id])
  end

  def user
    @user = User.find(params[:user_id])
  end

  def permitted_params
    params.require(:job_incentive).permit(:user_id, :bonus_amount, :bonus_description)
  end

end
