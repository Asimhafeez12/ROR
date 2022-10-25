json.array! @chatrooms.each_with_index do |chatroom, index|
	json.user get_other_partner_for_chatroom(chatroom)
	json.current_chatroom_id chatroom.id
	json.current_chatroom_last_message get_last_message_for_chatroom(chatroom)
	json.unread_messages_for_current_chatroom get_unread_messages(chatroom)
	json.chatroom_job_title chatroom.job_title
	json.chatroom_job_id chatroom.job_id
	json.chatroom_job_state chatroom.job_state
	json.updated_at chatroom.updated_at
end


