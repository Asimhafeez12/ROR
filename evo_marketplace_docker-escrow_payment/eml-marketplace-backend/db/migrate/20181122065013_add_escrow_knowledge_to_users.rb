class AddEscrowKnowledgeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :escrow_knowledge, :boolean
  end
end
