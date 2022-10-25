class AddEndingDateToUserExperiences < ActiveRecord::Migration[5.1]
  def change
    add_column :user_experiences, :ending_date, :string
  end
end
