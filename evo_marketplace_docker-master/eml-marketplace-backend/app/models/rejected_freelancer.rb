class RejectedFreelancer < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true
  delegate :email, :first_name, :full_name, :badges, to: :user, allow_nil: true, prefix: true
  delegate :user_id, :user_first_name, :user_full_name, :user_email, :title, to: :job, allow_nil: true, prefix: true
  after_create :send_notification_to_client

  def send_notification_to_client
  	Notification.create(recipient_id: self.job_user_id, action: "notifications.job.open", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.job_user_id).job_offer_rejected == true
  	MyMailer.job_offer_rejected(self).deliver_later if User.find(self.job_user_id).job_offer_rejected_email == true
  end
end
