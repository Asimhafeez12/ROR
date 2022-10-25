class UserEducation < ApplicationRecord
	belongs_to :user, optional: true
end
