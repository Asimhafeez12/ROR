class AddExpertLevelToTaggings < ActiveRecord::Migration[5.1]
  def change
    add_column :taggings, :expert_level, :string
  end
end
