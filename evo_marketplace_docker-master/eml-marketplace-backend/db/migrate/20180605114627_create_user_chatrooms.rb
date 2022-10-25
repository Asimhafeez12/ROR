class CreateUserChatrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :user_chatrooms do |t|
      t.references :user, foreign_key: true
      t.references :chatroom, foreign_key: true
      t.integer :owner_id
      t.timestamps
    end
  end
end
