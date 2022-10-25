class AddIndexesToRejectedFreelancers < ActiveRecord::Migration[5.1]
  def change
  	add_index :rejected_freelancers, :user_id
  	add_index :rejected_freelancers, :job_id
  end
end
