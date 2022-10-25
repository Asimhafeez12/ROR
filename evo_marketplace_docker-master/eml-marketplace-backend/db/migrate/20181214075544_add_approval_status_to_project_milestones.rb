class AddApprovalStatusToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :approval_status, :string
  end
end
