class CreateUserCertificates < ActiveRecord::Migration[5.1]
  def change
    create_table :user_certificates do |t|
      t.string :title
      t.string :starting_date
      t.string :institution_name
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
