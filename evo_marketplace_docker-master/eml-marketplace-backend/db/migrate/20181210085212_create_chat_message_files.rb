class CreateChatMessageFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_message_files do |t|
      t.string :file
      t.references :chatroom_message
      t.timestamps
    end
  end
end
