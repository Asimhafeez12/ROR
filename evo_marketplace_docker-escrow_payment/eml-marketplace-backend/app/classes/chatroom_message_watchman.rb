class ChatroomMessageWatchman
  attr_accessor :message
  def initialize(message)
    self.message = message
  end
  def alert_members
    chatroom_members_id.map { |id| NotificationBroadcastJob.perform_now(message, id) }
    ChatroomBroadcastJob.perform_now(message)
  end
  def chatroom_members
    message.chatroom.user_chatrooms.reject { |uc| uc.user_id == message.user_id }
  end
  def chatroom_members_id
    chatroom_members.map(&:user_id)
  end
end
