class Api::V1::EditMilestonesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :send_notifications_to_freelancers_after_milestone_update, only: [:update]
  after_action :create_new_escrow_transaction, only: [:update]
  
  def update
  	(@project_milestone = ProjectMilestone.find(params[:id])).update(permitted_params)
  end

  protected
  def permitted_params
    params.require(:project_milestone).permit(:user_id, :closing_date, :title, :price, :is_delivered, :description, :approval_status, :is_accepted)
  end

  def create_transaction
     Escrow::CreateTransaction.new(@project_milestone)
  end

  def send_notifications_to_freelancers_after_milestone_update
    Notification.create(user_id: current_user.id, recipient_id: @project_milestone.user_id, action: "notifications.job.milestone.updated", notifiable_type: "Job", notifiable_id: @project_milestone.job_id)
  end

  def create_new_escrow_transaction
  	@response = @project_milestone.create_transaction.response
  	@project_milestone.update(escrow_transaction_id: @response.id)
  	@response && @response.id && Escrow::AgreeTransaction.new(@project_milestone).response
  end

end
