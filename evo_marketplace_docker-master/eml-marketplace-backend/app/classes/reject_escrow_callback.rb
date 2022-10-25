class RejectEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: 'reject')
  	Notification.create(action: "notifications.job.milestone.escrow.reject", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id)
    Notification.create(action: "notifications.job.milestone.escrow.reject", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id)
  end
end
