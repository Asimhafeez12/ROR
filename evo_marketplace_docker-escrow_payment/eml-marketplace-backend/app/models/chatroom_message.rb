class ChatroomMessage < ApplicationRecord
  acts_as_readable on: :created_at
  belongs_to :chatroom
  belongs_to :user, optional: true
  after_create { |resource| puts("*" * 10, "\n" * 3, "its here");ChatroomMessageWatchman.new(resource).alert_members }
  delegate :full_name, :avatar_url, :_r, to: :user, prefix: true, allow_nil: true
  def recipient_id
    user_id
  end
  def as_json(options={})
    super(options.merge({methods: [:user_full_name, :user_avatar_url, :user__r]}))
  end
end

