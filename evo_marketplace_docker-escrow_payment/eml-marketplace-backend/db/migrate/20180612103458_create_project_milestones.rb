class CreateProjectMilestones < ActiveRecord::Migration[5.1]
  def change
    create_table :project_milestones do |t|
      t.string :title
      t.datetime :closing_date
      t.references :user, foreign_key: true
      t.references :job, foreign_key: true
      t.boolean :is_delivered, default: false
      t.monetize :price

      t.timestamps
    end
  end
end
