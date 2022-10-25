class CreateBadges < ActiveRecord::Migration[5.1]
  def change
    create_table :badges do |t|
      t.string :title
      t.string :description
      t.string :expert_level
      t.string :avatar

      t.timestamps
    end
  end
end
