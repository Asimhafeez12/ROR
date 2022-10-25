class JobIncentive < ApplicationRecord
	belongs_to :job, optional: true
	belongs_to :user, optional: true
end

