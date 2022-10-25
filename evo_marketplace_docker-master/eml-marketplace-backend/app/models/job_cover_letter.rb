class JobCoverLetter < ApplicationRecord
	belongs_to :job, optional: true
	belongs_to :user, optional: true
	delegate :title, :user_id, :user_full_name, :user_first_name, :user_email, to: :job, allow_nil: true, prefix: true
	delegate :full_name, :first_name, to: :user, allow_nil: true, prefix: true
	after_create :send_notification_to_client

  def send_notification_to_client
  	Notification.create(user_id: self.user_id, recipient_id: self.job_user_id, action: "notifications.job.cover.created.client", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.job_user_id).cover_letter_received == true
  end
end
