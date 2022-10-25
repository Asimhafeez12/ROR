class AddApprovedOnToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :approved_on, :datetime
  end
end
