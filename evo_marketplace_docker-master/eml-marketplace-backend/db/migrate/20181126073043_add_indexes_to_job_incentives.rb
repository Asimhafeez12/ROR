class AddIndexesToJobIncentives < ActiveRecord::Migration[5.1]
  def change
  	add_index :job_incentives, :job_id
  	add_index :job_incentives, :user_id
  end
end