class EscrowCallback
  attr_accessor :transaction_id, :event_type, :event, :reference
  def initialize(attrs={})
    attrs.each { |k, v| send("#{k}=", v) }
  end
  def commit!
    find_adapter
  end
  def find_adapter
    {
      create: CreateEscrowCallback,
      agree: AgreeEscrowCallback,
      payment_approved: PaymentApprovedEscrowCallback,
      payment_rejected: PaymentRejectedEscrowCallback,
      ship: ShipEscrowCallback,
      receive: ReceiveEscrowCallback,
      accept: AcceptEscrowCallback,
      reject: RejectEscrowCallback,
      ship_return: ShipReturnEscrowCallback,
      receive_return: ReceiveReturnEscrowCallback,
      accept_return: AcceptReturnEscrowCallback,
      reject_return: RejectReturnEscrowCallback,
      complete: CompleteEscrowCallback
    }.with_indifferent_access[event].new(transaction).commit!
  end
  def transaction
    @project_milestone = ProjectMilestone.find_by escrow_transaction_id: transaction_id
  end
end
