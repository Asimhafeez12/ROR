class Api::V1::ReadMessagesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def update
  	@user = current_user; @messages = chatroom.chatroom_messages.where.not(user_id: current_user.id); @messages.mark_as_read! :all, for: @user if @messages.unread_by(current_user).count > 0
  	@messages = @messages.unread_by(@user).order(created_at: :desc) || false
  end

  private
  def chatroom
    @chatroom = Chatroom.find(params[:id])
  end
end
