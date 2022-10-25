class AddIndexToUserTables < ActiveRecord::Migration[5.1]
  def change
  	add_index :user_portfolios, :user_id
  	add_index :user_educations, :user_id
  	add_index :user_certificates, :user_id
  	add_index :user_experiences, :user_id
  end
end
