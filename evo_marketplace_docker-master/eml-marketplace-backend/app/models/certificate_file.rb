class CertificateFile < ApplicationRecord
  belongs_to :user_certificate, optional: true
  mount_uploader :file, FileUploader
  def file=(f)
    f = File.open(Rails.root.join("public").to_s + (@temp_file_path = f)) if file.kind_of? String
    super(f)
  end
end
