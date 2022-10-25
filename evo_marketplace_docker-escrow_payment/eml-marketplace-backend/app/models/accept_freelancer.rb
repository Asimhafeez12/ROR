class AcceptFreelancer < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true
  delegate :email, :full_name, :skill_list, :expertise_list, to: :user, allow_nil: true, prefix: true
  after_create :send_notification_to_freelancers

  def send_notification_to_freelancers
  	Notification.create(recipient_id: self.user_id, action: "notifications.job.hired", notifiable_type: "Job", notifiable_id: self.job_id)
  end
end
