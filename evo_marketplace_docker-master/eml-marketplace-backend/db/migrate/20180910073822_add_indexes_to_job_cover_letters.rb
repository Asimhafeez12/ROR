class AddIndexesToJobCoverLetters < ActiveRecord::Migration[5.1]
  def change
  	add_index :job_cover_letters, :job_id
  	add_index :job_cover_letters, :user_id
  end
end
