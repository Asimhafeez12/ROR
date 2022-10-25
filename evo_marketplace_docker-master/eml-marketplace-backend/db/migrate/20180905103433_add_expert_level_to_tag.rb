class AddExpertLevelToTag < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :expert_level, :string
  end
end
