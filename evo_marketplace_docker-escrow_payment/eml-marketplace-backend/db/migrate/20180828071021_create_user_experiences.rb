class CreateUserExperiences < ActiveRecord::Migration[5.1]
  def change
    create_table :user_experiences do |t|
      t.string :institute_name
      t.string :starting_date
      t.string :degree_name
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
