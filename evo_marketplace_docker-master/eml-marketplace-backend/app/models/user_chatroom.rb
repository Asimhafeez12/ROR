class UserChatroom < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :chatroom, optional: true
  belongs_to :owner, class_name: 'User', optional: true
  delegate :id, :full_name, to: :user, allow_nil: true, prefix: true

  def last_message
  	Chatroom.find(self.chatroom_id).chatroom_messages.last
  end
end
