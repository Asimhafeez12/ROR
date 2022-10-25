class CreateJobFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :job_files do |t|
      t.integer :job_id
      t.string :avatar

      t.timestamps
    end
  end
end
