class AddDescriptionToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :description, :string
  end
end
