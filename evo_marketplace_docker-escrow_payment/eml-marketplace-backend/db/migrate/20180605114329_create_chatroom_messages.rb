class CreateChatroomMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :chatroom_messages do |t|
      t.references :user, foreign_key: true
      t.references :chatroom
      t.text :body

      t.timestamps
    end
  end
end
