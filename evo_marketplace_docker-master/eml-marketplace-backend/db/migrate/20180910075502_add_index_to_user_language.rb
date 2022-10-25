class AddIndexToUserLanguage < ActiveRecord::Migration[5.1]
  def change
  	add_index :user_languages, :user_id
  end
end
