class AddSummaryToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :summary, :string
  end
end
