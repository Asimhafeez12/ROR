class Escrow::AgreeTransaction < Escrow::Main
  attr_accessor :project_milestone

  def initialize(project_milestone)
    self.project_milestone = project_milestone
  end

  def urn
    "transaction/#{escrow_transaction_id}"
  end

  def data
    {
      action: 'agree'
    }
  end

  def request
    patch
  end
  delegate :escrow_transaction_id, to: :project_milestone, allow_nil: true
end
