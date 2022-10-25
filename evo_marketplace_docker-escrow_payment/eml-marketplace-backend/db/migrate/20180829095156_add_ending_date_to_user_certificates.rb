class AddEndingDateToUserCertificates < ActiveRecord::Migration[5.1]
  def change
    add_column :user_certificates, :ending_date, :string
  end
end
