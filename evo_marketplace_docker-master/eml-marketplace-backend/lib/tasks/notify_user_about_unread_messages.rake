require "#{Rails.root}/app/helpers/application_helper"
include ApplicationHelper
desc "notify_user_about_unread_messages"
task notify_user_about_unread_messages: :environment do
	User.all.each do |user|
		@total_messages = []
		@user_specific_messages = []
		@total_messages = ChatroomMessage.unread_by(user)
		@total_messages.each do |msg|
			@chatroom = Chatroom.find(msg.chatroom_id) if msg.chatroom_id.present?
			if @chatroom.present? && @chatroom.user_chatrooms.where(user_id: user.id).count > 0
				if UserMessage.where(chatroom_message_id: msg.id, user_id: user.id).count == 0
					@user_specific_messages.push(msg) 
					UserMessage.create(chatroom_message_id: msg.id, user_id: user.id)
				end 
			end
		end	
		MyMailer.notify_user_about_unread_messages(user.id, @user_specific_messages).deliver_now if @user_specific_messages.count > 0 && @user.unread_messages_interval != "Never"
	end
end


