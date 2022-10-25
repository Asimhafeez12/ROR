class AddIsCProfileSetupToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_c_profile_setup, :boolean, default: false
  end
end
