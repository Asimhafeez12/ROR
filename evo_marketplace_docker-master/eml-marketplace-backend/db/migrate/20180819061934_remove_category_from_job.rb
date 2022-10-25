class RemoveCategoryFromJob < ActiveRecord::Migration[5.1]
  def change
    remove_column :jobs, :category, :string
  end
end
