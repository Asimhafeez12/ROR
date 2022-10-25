class Api::V1::UserChatroomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    (@user_chatroom = Chatroom.new(permitted_params)).save
  end
  protected
  def permitted_params
    params.require(:chatroom).permit(:job_id, user_chatrooms_attributes: [:user_id], chatroom_messages_attributes: [:body, :user_id])
  end
end
