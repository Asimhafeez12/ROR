class AddIndexesToJobRating < ActiveRecord::Migration[5.1]
  def change
  	add_index :job_ratings, :job_id
  	add_index :job_ratings, :user_id
  end
end
