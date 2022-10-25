class AddIsAcceptedToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :is_accepted, :boolean
  end
end
