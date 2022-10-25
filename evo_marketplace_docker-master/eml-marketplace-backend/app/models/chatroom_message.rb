class ChatroomMessage < ApplicationRecord
  acts_as_readable on: :created_at
  belongs_to :chatroom
  belongs_to :user, optional: true
  has_many :chat_message_files, dependent: :destroy
  accepts_nested_attributes_for :chat_message_files, allow_destroy: true, reject_if: :all_blank
  delegate :full_name, :avatar_url, :_r, to: :user, prefix: true, allow_nil: true
  delegate :job_title, :job_id, to: :chatroom, prefix: true, allow_nil: true
  def recipient_id
    user_id
  end
  def as_json(options={})
    super(options.merge({methods: [:user_full_name, :user_avatar_url, :user__r, :chat_message_files]}))
  end
end

