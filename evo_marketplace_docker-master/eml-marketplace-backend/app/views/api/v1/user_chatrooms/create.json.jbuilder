if @user_chatroom.errors.any?
  json.errors @user_chatroom.errors
else
  json.extract! @user_chatroom, :id
end

