class CreateCertificateFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :certificate_files do |t|
      t.string :file
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
