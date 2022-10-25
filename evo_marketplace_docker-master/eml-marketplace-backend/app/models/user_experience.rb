class UserExperience < ApplicationRecord
	belongs_to :user, optional: true
  attr_accessor :exp_date
  def exp_date=(d)
    self.starting_date, self.ending_date = d
  end
end
