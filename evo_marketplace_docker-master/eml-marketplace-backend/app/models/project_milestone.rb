class ProjectMilestone < ApplicationRecord
  belongs_to :user
  belongs_to :job
  delegate :id, :title, :amount_remaining_for_open_milestones, :translated_duration, :translated_availability, :user_id, :user_first_name, :user_full_name, :user_email, to: :job, allow_nil: true, prefix: true
  monetize :price_cents
  after_create do |project_milestone|
    response = project_milestone.create_transaction.response
    project_milestone.update(escrow_transaction_id: response.id)
    response && response.id && Escrow::AgreeTransaction.new(project_milestone).response
    MyMailer.milestone_created(self).deliver_later
  end

  def milestone_count
    self.job.milestones_count
  end

  def create_transaction
     Escrow::CreateTransaction.new(self)
  end

  def closing_date_in_days
    (closing_date.to_date - DateTime.now.to_date).to_i.days / 1.second
  end
  def broker_fees
    price.to_f * 0.20
  end
  delegate :full_name, :email, to: :user, allow_nil: true, prefix: true
  delegate :user, to: :job, prefix: true
end
