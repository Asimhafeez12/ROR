class AddJobIdToJobCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :job_categories, :job_id, :integer
  end
end
