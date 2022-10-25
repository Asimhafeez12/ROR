class Api::V1::MyChatroomsController < ApplicationController

  def index
	@chatrooms = Chatroom.where(id: UserChatroom.where(user_id: current_user.id).pluck(:chatroom_id)).order('updated_at desc').limit(5) if current_user.present?
  end
end
