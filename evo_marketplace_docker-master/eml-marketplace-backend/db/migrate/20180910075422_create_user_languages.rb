class CreateUserLanguages < ActiveRecord::Migration[5.1]
  def change
    create_table :user_languages do |t|
      t.string :language
      t.integer :user_id

      t.timestamps
    end
  end
end
