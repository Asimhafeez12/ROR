class Api::V1::MyChatroomsController < ApplicationController

  def index
	@chatrooms = Chatroom.where(id: UserChatroom.where(user_id: current_user.id).pluck(:chatroom_id)).includes(:chatroom_messages).order('chatroom_messages.created_at desc').limit(5)
  end

  def all_chatrooms
	@chatrooms = Chatroom.where(id: UserChatroom.where(user_id: current_user.id).pluck(:chatroom_id)).includes(:chatroom_messages).order('chatroom_messages.created_at desc')
  end
end
