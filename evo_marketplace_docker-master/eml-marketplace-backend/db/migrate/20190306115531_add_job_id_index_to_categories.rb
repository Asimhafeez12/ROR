class AddJobIdIndexToCategories < ActiveRecord::Migration[5.1]
  def change
  	add_index :home_categories, :job_id
  	add_index :home_illustrations, :job_id
  end
end
