class AcceptFreelancer < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true
  delegate :email, :full_name, :first_name, :badges, to: :user, allow_nil: true, prefix: true
  delegate :id, :title, :amount_remaining_for_open_milestones, :translated_duration, :translated_availability, :user_id, :user_first_name, :user_full_name, :user_email, to: :job, allow_nil: true, prefix: true
  after_create :send_notification_to_freelancers

  def send_notification_to_freelancers
  	Notification.create(recipient_id: self.user_id, action: "notifications.job.hired", notifiable_type: "Job", notifiable_id: self.job_id) if User.find(self.user_id).job_started == true
  	MyMailer.job_initiated(self).deliver_later if User.find(self.user_id).job_started_email == true
  	MyMailer.job_offer_accepted(self).deliver_later if User.find(self.job_user_id).job_offer_accepted_email == true
  end
end

