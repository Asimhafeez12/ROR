class AddMoreColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :security_question, :string
    add_column :users, :security_answer, :string
    add_column :users, :is_active, :boolean
    add_column :users, :deactivation_reason, :string
  end
end
