class AddJobIdToChatrooms < ActiveRecord::Migration[5.1]
  def change
    add_column :chatrooms, :job_id, :integer
  end
end
