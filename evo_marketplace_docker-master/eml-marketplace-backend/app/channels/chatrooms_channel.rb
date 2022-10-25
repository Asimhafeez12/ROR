class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatrooms:#{params["chatroom_id"]}"
  end
  def unsubscribed
    stop_all_streams
  end
  def send_message(data)
  	Chatroom.find(params[:chatroom_id]).update(updated_at: Time.now)
    (chatroom_message = ChatroomMessage.new({user_id: current_user.id, body: data['body'], chatroom_id: params[:chatroom_id]}.merge( data["chat_message_files_attributes"] && { chat_message_files_attributes: data["chat_message_files_attributes"] } || {}))).save && ChatroomMessageWatchman.new(chatroom_message).alert_members || false
  end
end
