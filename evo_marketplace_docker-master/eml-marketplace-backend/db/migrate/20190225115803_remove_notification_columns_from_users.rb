class RemoveNotificationColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :rating, :string
    remove_column :users, :received, :boolean
  end
end
