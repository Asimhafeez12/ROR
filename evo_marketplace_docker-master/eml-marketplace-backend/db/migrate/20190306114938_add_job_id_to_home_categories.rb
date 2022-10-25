class AddJobIdToHomeCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :home_categories, :job_id, :integer
  end
end
