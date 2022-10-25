class CreateUserPortfolios < ActiveRecord::Migration[5.1]
  def change
    create_table :user_portfolios do |t|
      t.string :title
      t.string :link
      t.string :avatar
      t.integer :user_id

      t.timestamps
    end
  end
end
