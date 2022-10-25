class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user!
  def index
  	@messages = Chatroom.find(params[:chatroom_id]).chatroom_messages.where.not(user_id: current_user.id).mark_as_read! :all, for: current_user if params[:chatroom_id] != "undefined"
    @messages = Chatroom.includes(:user_chatrooms).where(user_chatrooms: { user_id: [current_user.id]}, id: params[:chatroom_id]).try(:first).try(:chatroom_messages).order(created_at: :asc) if Chatroom.includes(:user_chatrooms).where(user_chatrooms: { user_id: [current_user.id]}, id: params[:chatroom_id]).try(:first).try(:chatroom_messages).present?
  end
end
