class CreateRejectedFreelancers < ActiveRecord::Migration[5.1]
  def change
    create_table :rejected_freelancers do |t|
      t.integer :user_id
      t.integer :job_id
      t.string :description

      t.timestamps
    end
  end
end
