class AddIndexesToOptedFreelancers < ActiveRecord::Migration[5.1]
  def change
  	add_index :opted_freelancers, :user_id
  	add_index :opted_freelancers, :job_id
  end
end
