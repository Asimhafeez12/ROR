class AddJobIdIndexToJobCategory < ActiveRecord::Migration[5.1]
  def change
  	add_index :job_categories, :job_id
  end
end
