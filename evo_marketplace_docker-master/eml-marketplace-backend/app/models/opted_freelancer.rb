class OptedFreelancer < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true
  delegate :email, :first_name, :full_name, :badges, to: :user, allow_nil: true, prefix: true
  delegate :id, :title, :description, :minimum_budget, :translated_duration, :translated_availability, :user_id, :user_first_name, :user_full_name, :user_email, to: :job, allow_nil: true, prefix: true
  after_create :send_notification_to_opted_freelancers

  def send_notification_to_opted_freelancers
  	RejectedFreelancer.where(user_id: self.user_id, job_id: self.job_id).delete_all
  	Notification.create(recipient_id: self.job_user_id, action: "notifications.job.opted", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.job_user_id).job_offer_sent == true
  	Notification.create(recipient_id: self.user_id, action: "notifications.job.received", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.user_id).job_offer_received == true
  	MyMailer.job_offer_sent(self).deliver_later if User.find(self.job_user_id).job_offer_sent_email == true
  	MyMailer.job_offer_received(self).deliver_later if User.find(self.user_id).job_offer_received_email == true
  end
end

