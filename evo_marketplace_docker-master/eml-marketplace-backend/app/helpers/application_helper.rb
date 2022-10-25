module ApplicationHelper
  def current_chatroom_id(user, current_user, job)
    Chatroom.where(id: (user && current_user && (UserChatroom.where(user_id: user.id).pluck(:chatroom_id) & UserChatroom.where(user_id: current_user.id).pluck(:chatroom_id)))).find_by(job_id: job.id) || false
  end

  def current_chatroom_last_message(user, current_user)
    Chatroom.find(current_chatroom_id(user, current_user)).chatroom_messages.last if Chatroom.find(current_chatroom_id(user, current_user)).present?
  end


  def unread_messages_for_current_chatroom(user)
  	Chatroom.find(current_chatroom_id(user, current_user)).chatroom_messages.where.not(user_id: current_user.id).unread_by(current_user).count
  end

  def get_other_partner_for_chatroom(chatroom)
  	User.find(chatroom.user_chatrooms.where.not(user_id: current_user.id).first.user_id) || false
  end

  def get_last_message_for_chatroom(chatroom)
  	chatroom.chatroom_messages.last || false
  end

 def get_unread_messages(chatroom)
  	chatroom.chatroom_messages.where.not(user_id: current_user.id).unread_by(current_user).count
  end

  def get_cover_letter(user_id, job_id)
    JobCoverLetter.find_by(user_id: user_id, job_id: job_id) || false
  end

  def get_rejected_freelancer(job_id)
    RejectedFreelancer.where(job_id: job_id).first || false
  end

  def uri?(string)
    uri = URI.parse(string)
    %w( http https ).include?(uri.scheme)
    rescue URI::BadURIError
      false
    rescue URI::InvalidURIError
      false
  end
  # def current_chatroom_id(user, current_user)
  #   user && current_user && Chatroom.joins(:user_chatrooms).where(user_chatrooms: {user_id: [user.id, current_user.id]}).uniq.first.try(:id) || false
  # end
end
