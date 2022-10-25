class Api::V1::JobCoverLettersController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def create
    (@job_cover_letter = JobCoverLetter.new(permitted_params)).save
  end

  def show
  	@job_cover_letter = JobCoverLetter.find_by(user_id: params[:id], job_id: params[:job_id])
  end

  private

  def job
    @job = Job.find(params[:job_id])
  end

  def user
    @user = User.find(params[:id])
  end
  
  def permitted_params
    params.require(:job_cover_letter).permit(:expected_amount, :expected_timeline, :cover_letter, :user_id, :job_id)
  end
end
