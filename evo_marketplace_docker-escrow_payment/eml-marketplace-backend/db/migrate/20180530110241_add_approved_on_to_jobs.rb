class AddApprovedOnToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :approved_on, :datetime
  end
end

