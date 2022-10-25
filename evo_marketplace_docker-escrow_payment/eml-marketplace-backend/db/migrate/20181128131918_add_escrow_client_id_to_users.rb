class AddEscrowClientIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :escrow_client_id, :string, default: nil
  end
end
