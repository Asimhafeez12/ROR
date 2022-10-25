class CreateUserBillings < ActiveRecord::Migration[5.1]
  def change
    create_table :user_billings do |t|
      t.string :first_name
      t.string :last_name
      t.string :country
      t.string :address
      t.string :city
      t.string :zip_code
      t.boolean :send_invoice

      t.timestamps
    end
  end
end
