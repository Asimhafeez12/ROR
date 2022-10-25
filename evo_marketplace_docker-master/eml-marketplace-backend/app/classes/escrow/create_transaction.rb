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
          role: "buyer",
          customer: job.user_email,
        },
        {
          role: "seller",
          customer: user_email,
        },
        {
          role: "broker",
          customer: "me"
        }
      ],
      currency: "usd",
      description: project_milestone.description,
      items: [
        {
          title: project_milestone.title,
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
        },
        {
          type: :broker_fee,
          schedule: [
            {
              amount: broker_fees,
              payer_customer: user_email,
              beneficiary_customer: "me"
            }
          ]
        }
      ]
    }
  end

  def request
    post
  end
  delegate :user_email, :job, :broker_fees, to: :project_milestone, allow_nil: true
end
