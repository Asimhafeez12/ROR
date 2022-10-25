class AddJobIdToHomeIllustrations < ActiveRecord::Migration[5.1]
  def change
    add_column :home_illustrations, :job_id, :integer
  end
end
