class CreateJobIncentives < ActiveRecord::Migration[5.1]
  def change
    create_table :job_incentives do |t|
      t.integer :user_id
      t.integer :job_id
      t.integer :bonus_amount
      t.string :bonus_description

      t.timestamps
    end
  end
end
