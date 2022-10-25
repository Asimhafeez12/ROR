class RemoveExpertLevelFromTags < ActiveRecord::Migration[5.1]
  def change
    remove_column :tags, :expert_level, :string
  end
end
