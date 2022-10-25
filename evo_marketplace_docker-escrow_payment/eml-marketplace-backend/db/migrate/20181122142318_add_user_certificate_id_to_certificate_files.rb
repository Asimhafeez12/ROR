class AddUserCertificateIdToCertificateFiles < ActiveRecord::Migration[5.1]
  def change
    add_column :certificate_files, :user_certificate_id, :bigint
  end
end
