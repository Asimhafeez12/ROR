class RemoveJobIdFromJobAdvisors < ActiveRecord::Migration[5.1]
  def change
    remove_column :job_advisors, :job_id, :integer
  end
end
