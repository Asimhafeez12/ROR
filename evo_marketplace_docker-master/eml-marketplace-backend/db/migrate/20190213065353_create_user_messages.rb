class CreateUserMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :user_messages do |t|
      t.integer :chatroom_message_id
      t.integer :user_id

      t.timestamps
    end
  end
end
