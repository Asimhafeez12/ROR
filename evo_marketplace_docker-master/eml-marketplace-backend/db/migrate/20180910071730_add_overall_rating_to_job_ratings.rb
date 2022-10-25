class AddOverallRatingToJobRatings < ActiveRecord::Migration[5.1]
  def change
    add_column :job_ratings, :overall_rating, :float
  end
end
