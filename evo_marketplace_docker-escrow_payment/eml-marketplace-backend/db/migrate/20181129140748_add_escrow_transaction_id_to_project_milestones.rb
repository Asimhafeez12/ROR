class AddEscrowTransactionIdToProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    add_column :project_milestones, :escrow_transaction_id, :string
  end
end
