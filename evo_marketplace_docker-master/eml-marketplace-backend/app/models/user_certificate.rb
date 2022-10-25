class UserCertificate < ApplicationRecord
	belongs_to :user, optional: true
  has_many :certificate_files, dependent: :destroy
  accepts_nested_attributes_for :certificate_files, reject_if: :all_blank, allow_destroy: true
  attr_accessor :date
  def date=(d)
    self.starting_date, self.ending_date = d
  end
end
