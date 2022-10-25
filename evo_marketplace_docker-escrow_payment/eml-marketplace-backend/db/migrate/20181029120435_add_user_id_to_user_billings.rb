class AddUserIdToUserBillings < ActiveRecord::Migration[5.1]
  def change
    add_column :user_billings, :user_id, :integer
  end
end
