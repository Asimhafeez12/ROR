class Api::V1::UnreadMessagesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def show
    @total_unread_messages = current_user.total_unread_messages
  end

end
