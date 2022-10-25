class ChatMessageFile < ApplicationRecord
  belongs_to :chatroom_message, optional: true
  mount_uploader :file, FileUploader
  def file=(fl)
    fl = URI(fl).path rescue ''
    fl = File.open(Rails.root.join("public").to_s + (@temp_file_path = fl)) if fl.kind_of? String
    super(fl)
  end
end
