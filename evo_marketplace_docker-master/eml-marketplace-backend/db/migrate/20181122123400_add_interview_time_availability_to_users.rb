class AddInterviewTimeAvailabilityToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :interview_time_availability, :string
  end
end
