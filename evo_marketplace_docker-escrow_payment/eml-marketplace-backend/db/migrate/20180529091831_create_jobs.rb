class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :description
      t.string :posted_on
      t.string :hired_on
      t.string :deadline
      t.integer :minimum_budget

      t.timestamps
    end
  end
end
