class ProjectMilestone < ApplicationRecord
  belongs_to :user
  belongs_to :job
  monetize :price_cents
  after_create do |project_milestone|
    response = project_milestone.create_transaction.response
    project_milestone.update(escrow_transaction_id: response.id)
    response && response.id && Escrow::AgreeTransaction.new(project_milestone).response
  end

  def create_transaction
     Escrow::CreateTransaction.new(self)
  end

  def closing_date_in_days
    (closing_date.to_date - DateTime.now.to_date).to_i.days / 1.second
  end
  delegate :full_name, :email, to: :user, allow_nil: true, prefix: true
end
