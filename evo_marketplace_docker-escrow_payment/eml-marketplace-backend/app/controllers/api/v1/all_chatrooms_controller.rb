class Api::V1::AllChatroomsController < ApplicationController

  def index
	@all_chatrooms = Chatroom.where(id: UserChatroom.where(user_id: current_user.id).pluck(:chatroom_id)).includes(:chatroom_messages).order('chatroom_messages.created_at desc')
  end

end
