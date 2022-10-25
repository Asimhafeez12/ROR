class Escrow::CreateTransaction < Escrow::Main
  attr_accessor :project_milestone

  def initialize(project_milestone)
    self.project_milestone = project_milestone
  end

  def urn
    "transaction"
  end

  def data
    {
      parties: [
        {
          initiator: false,
          role: "buyer",
          customer: job.user_email,
        },
        {
          initiator: true,
          agreed: true,
          role: "seller",
          customer: user_email
        }
      ],
      currency: "usd",
      description: project_milestone.description,
      items: [
        {
          title: project_milestone.description,
          description: project_milestone.description,
          type: "milestone",
          quantity: 1,
          inspection_period: project_milestone.closing_date_in_days,
          schedule: [
            {
              amount: project_milestone.price.try(:to_f),
              payer_customer: job.user_email,
              beneficiary_customer: user_email
            }
          ]
        }
      ]
    }
  end

  def request
    post
  end
  delegate :user_email, :job, to: :project_milestone, allow_nil: true
end
