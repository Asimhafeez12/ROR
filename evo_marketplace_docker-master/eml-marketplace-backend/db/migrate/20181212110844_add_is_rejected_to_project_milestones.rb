class AddIsRejectedToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :is_rejected, :boolean
  end
end
