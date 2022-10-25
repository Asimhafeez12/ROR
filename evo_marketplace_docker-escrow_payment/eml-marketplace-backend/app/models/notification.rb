class Notification < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :recipient, class_name: 'User'
  belongs_to :notifiable, polymorphic: true, optional: true
  after_create { |resource| NotificationBroadcastJob.perform_now(resource) }

  acts_as_readable on: :created_at

end
