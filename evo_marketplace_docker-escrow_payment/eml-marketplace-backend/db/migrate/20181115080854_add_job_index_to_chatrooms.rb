class AddJobIndexToChatrooms < ActiveRecord::Migration[5.1]
  def change
  	add_index :chatrooms, :job_id
  end
end
