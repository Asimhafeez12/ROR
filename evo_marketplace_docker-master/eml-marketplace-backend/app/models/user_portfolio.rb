class UserPortfolio < ApplicationRecord
  mount_uploader :avatar, FileUploader
  belongs_to :user, optional: true
  def avatar=(file)
    file = File.open(Rails.root.join("public").to_s + (@temp_file_path = file)) if file.kind_of? String
    super(file)
  end
end
