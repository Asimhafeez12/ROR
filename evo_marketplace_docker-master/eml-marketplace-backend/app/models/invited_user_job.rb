class InvitedUserJob < ApplicationRecord
  belongs_to :user
  belongs_to :job
  delegate :email, :first_name, :full_name, :average_job_rating_for_all_jobs, :badges, to: :user, allow_nil: true, prefix: true
  delegate :id, :title, :description, :minimum_budget, :translated_duration, :translated_availability, to: :job, allow_nil: true, prefix: true
  after_create :send_notification_to_freelancers

  def send_notification_to_freelancers
  	Notification.create(recipient_id: self.user_id, action: "notifications.job.recommended", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.user_id).invitation_received == true
  	MyMailer.job_recommendation(self).deliver_later if User.find(self.user_id).invitation_received_email == true
  end
  
end
