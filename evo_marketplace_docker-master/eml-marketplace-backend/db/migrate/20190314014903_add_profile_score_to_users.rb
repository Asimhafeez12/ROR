class AddProfileScoreToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :profile_score, :integer, default: 40
  end
end
