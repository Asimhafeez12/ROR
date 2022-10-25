class UserBadge < ApplicationRecord
  belongs_to :user
  belongs_to :badge
  delegate :id, :email, :full_name, to: :user, allow_nil: true, prefix: true
  delegate :title, :description, :expert_level, :avatar_url, to: :badge, allow_nil: true, prefix: true
end
