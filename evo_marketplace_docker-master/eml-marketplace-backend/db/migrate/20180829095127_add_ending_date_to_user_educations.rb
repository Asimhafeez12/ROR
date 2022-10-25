class AddEndingDateToUserEducations < ActiveRecord::Migration[5.1]
  def change
    add_column :user_educations, :ending_date, :string
  end
end
