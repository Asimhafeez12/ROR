class AddChatroomTypeToUserChatrooms < ActiveRecord::Migration[5.1]
  def change
    add_column :user_chatrooms, :chatroom_type, :string, default: :o_to_o
  end
end
