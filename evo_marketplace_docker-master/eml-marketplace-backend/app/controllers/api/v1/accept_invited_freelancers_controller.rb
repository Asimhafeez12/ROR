class Api::V1::AcceptInvitedFreelancersController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  after_action :send_notification_to_client, only: [:create]
  after_action :accept_existing_milestones, only: [:create]
  after_action :reject_other_freelancers, only: [:create]
  def index
    @accepted_freelancers = Job.find(params[:job_id]).accept_freelancers
  end
  def create
    (@job = Job.find(params[:job_id])).update(permitted_params)
  end
  private
  def job
    Job.find(params[:job_id])
  end
  def permitted_params
    params.require(:job).permit(:state_event, :event, :state, accept_freelancers_attributes: [:user_id])
  end
  def send_notification_to_client
    Notification.create(user_id: current_user.id, action: "notifications.job.active", recipient_id: job.user_id, notifiable_type: "Job", notifiable_id: job.id) if User.find(job.user_id).job_offer_accepted == true
  end
  def accept_existing_milestones
    job.update(starting_date: Date.today)
    job.project_milestones.update_all(is_accepted: true)
  end

  def reject_other_freelancers
    job.invited_freelancers.each do |user|
      if JobCoverLetter.where(user_id: user.id, job_id: job.id).count == 1 && AcceptFreelancer.where(job_id: job.id, user_id: user.id).count == 0
        Notification.create(recipient_id: user.id, action: "notifications.job.rejected", notifiable_type: "Job", notifiable_id: job.id)
        MyMailer.freelancer_rejected(job, user).deliver_later
      end
    end
  end
end
