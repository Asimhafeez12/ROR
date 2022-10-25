class RemoveLanguageFromUserLanguages < ActiveRecord::Migration[5.1]
  def change
    remove_column :user_languages, :language, :string
  end
end
