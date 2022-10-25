class AddIsNotActiveToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_not_active, :boolean
  end
end
