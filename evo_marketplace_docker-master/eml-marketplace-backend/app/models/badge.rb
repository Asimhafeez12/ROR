class Badge < ApplicationRecord
  mount_uploader :avatar, FileUploader
  has_many :user_badges
  has_many :users, through: :user_badges
end
