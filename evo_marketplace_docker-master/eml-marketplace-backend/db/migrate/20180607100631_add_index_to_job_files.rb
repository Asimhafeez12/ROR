class AddIndexToJobFiles < ActiveRecord::Migration[5.1]
  def change
  	add_index :job_files, :job_id
  end
end
