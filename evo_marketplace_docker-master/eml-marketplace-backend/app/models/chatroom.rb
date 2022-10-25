class Chatroom < ApplicationRecord
  belongs_to :job, optional: true
  belongs_to :user, optional: true
  has_many :user_chatrooms, dependent: :destroy
  has_many :chatroom_messages, dependent: :destroy
  has_many :users, through: :user_chatrooms
  accepts_nested_attributes_for :chatroom_messages, reject_if: :all_blank, allow_destroy: true
  #default_scope {order('chatroom_messages.created_at DESC')}
  accepts_nested_attributes_for :user_chatrooms, reject_if: :all_blank, allow_destroy: true
  delegate :id, :title, :state, to: :job, allow_nil: true, prefix: true

end
