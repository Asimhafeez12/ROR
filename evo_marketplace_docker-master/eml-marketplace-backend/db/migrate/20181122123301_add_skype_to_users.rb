class AddSkypeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :skype, :string
  end
end
