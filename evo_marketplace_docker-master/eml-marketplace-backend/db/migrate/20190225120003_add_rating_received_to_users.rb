class AddRatingReceivedToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :rating_received, :boolean, :default => true
  end
end
