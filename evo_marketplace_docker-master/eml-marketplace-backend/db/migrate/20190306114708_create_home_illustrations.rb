class CreateHomeIllustrations < ActiveRecord::Migration[5.1]
  def change
    create_table :home_illustrations do |t|
      t.string :title
      t.string :avatar

      t.timestamps
    end
  end
end
