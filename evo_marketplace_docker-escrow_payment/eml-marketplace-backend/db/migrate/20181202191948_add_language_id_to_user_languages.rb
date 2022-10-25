class AddLanguageIdToUserLanguages < ActiveRecord::Migration[5.1]
  def change
    add_column :user_languages, :language_id, :integer
  end
end
