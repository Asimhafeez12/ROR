class AddApprovalStatusToTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :approval_status, :string
  end
end
