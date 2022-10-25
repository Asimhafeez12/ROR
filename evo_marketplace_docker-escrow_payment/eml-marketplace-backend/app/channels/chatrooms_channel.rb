class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatrooms:#{params["chatroom_id"]}"
  end
  def unsubscribed
    stop_all_streams
  end
  def send_message(data)
    (chatroom_message = ChatroomMessage.new(user_id: current_user.id, body: data['body'], chatroom_id: params[:chatroom_id])).save
  end
end
