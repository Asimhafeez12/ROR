class AddStateToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :state, :string
  end
end
