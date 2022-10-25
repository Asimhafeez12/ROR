class AddInterviewDateAvailabilityToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :interview_date_availability, :date
  end
end
