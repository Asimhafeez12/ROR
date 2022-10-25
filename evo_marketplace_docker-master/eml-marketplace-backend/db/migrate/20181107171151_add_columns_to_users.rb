class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
  	add_column :users, :payment_verified, :boolean, default: false
  	add_column :users, :city, :string
  end
end
