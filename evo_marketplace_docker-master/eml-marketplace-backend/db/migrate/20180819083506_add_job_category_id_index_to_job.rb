class AddJobCategoryIdIndexToJob < ActiveRecord::Migration[5.1]
  def change
  	add_index :jobs, :job_category_id
  end
end
