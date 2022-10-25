class CreateJobCoverLetters < ActiveRecord::Migration[5.1]
  def change
    create_table :job_cover_letters do |t|
      t.string :cover_letter
      t.string :expected_timeline
      t.integer :expected_amount
      t.integer :user_id
      t.integer :job_id

      t.timestamps
    end
  end
end
