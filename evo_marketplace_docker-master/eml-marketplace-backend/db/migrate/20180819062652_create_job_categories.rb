class CreateJobCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :job_categories do |t|
      t.string :name
      t.string :description
      t.string :avatar

      t.timestamps
    end
  end
end
