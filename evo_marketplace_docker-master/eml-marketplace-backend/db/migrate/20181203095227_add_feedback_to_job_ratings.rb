class AddFeedbackToJobRatings < ActiveRecord::Migration[5.1]
  def change
    add_column :job_ratings, :feedback, :string
  end
end
