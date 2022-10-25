class AddResendConfirmationToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :resend_confirmation, :boolean
  end
end
