class AddUserIndexesToUserBillings < ActiveRecord::Migration[5.1]
  def change
  	add_index :user_billings, :user_id
  end
end
