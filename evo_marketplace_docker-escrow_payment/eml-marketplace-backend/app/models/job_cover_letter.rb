class JobCoverLetter < ApplicationRecord
	belongs_to :job, optional: true
	belongs_to :user, optional: true
	delegate :user_id, to: :job, allow_nil: true, prefix: true
	after_create :send_notification_to_client

  def send_notification_to_client
  	Notification.create(user_id: self.user_id, recipient_id: self.job_user_id, action: "notifications.job.cover.created", notifiable_type: "Job", notifiable_id: self.job_id)
  end
end
