class HomeIllustration < ApplicationRecord
  mount_uploader :avatar, FileUploader
  belongs_to :job, optional: true
end
