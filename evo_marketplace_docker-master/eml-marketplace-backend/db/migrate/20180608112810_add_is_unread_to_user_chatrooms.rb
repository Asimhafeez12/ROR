class AddIsUnreadToUserChatrooms < ActiveRecord::Migration[5.1]
  def change
    add_column :user_chatrooms, :is_unread, :boolean, default:  true
  end
end
