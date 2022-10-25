class CreateAcceptFreelancers < ActiveRecord::Migration[5.1]
  def change
    create_table :accept_freelancers do |t|
      t.references :user, foreign_key: true
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
