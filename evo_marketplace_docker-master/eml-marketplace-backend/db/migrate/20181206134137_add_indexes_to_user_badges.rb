class AddIndexesToUserBadges < ActiveRecord::Migration[5.1]
  def change
  	add_index :user_badges, :user_id
  	add_index :user_badges, :badge_id
  end
end
