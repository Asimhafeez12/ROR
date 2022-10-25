class AddLanguageIndexToUserLanguages < ActiveRecord::Migration[5.1]
  def change
  	add_index :user_languages, :language_id
  end
end
