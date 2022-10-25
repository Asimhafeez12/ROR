class JobRating < ApplicationRecord
	belongs_to :job, optional: true
	belongs_to :user, optional: true
	after_create :send_notification_to_user

	def rounded_overall_rating
	  self.overall_rating.round
	end

	def send_notification_to_user
	  Notification.create(recipient_id: self.user_id, action: "notifications.job.rating", notifiable_type: "Job", notifiable_id: self.job_id)
	end
end
