class AddForeignKeyToJob < ActiveRecord::Migration[5.1]
  def change
  	add_foreign_key :jobs, :job_categories
  end
end
