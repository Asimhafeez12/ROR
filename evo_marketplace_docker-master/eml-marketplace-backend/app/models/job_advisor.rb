class JobAdvisor < ApplicationRecord
	belongs_to :job, optional: true
end
