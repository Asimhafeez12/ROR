class AddIsApprovedToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :is_approved, :boolean, default: false
  end
end
