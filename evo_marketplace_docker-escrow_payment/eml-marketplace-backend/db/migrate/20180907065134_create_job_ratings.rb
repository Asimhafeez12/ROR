class CreateJobRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :job_ratings do |t|
      t.integer :communication
      t.integer :accuracy
      t.integer :quality
      t.integer :value
      t.integer :deadline
      t.integer :availability
      t.string :review
      t.integer :user_id
      t.integer :job_id

      t.timestamps
    end
  end
end
