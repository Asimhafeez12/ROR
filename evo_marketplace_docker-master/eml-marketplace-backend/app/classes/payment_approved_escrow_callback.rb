class PaymentApprovedEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: 'payment_approved')
    Notification.create(action: "notifications.job.milestone.escrow.payment.approved.client", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id) if User.find(transaction.job.user_id).payment_approved == true
    Notification.create(action: "notifications.job.milestone.escrow.payment.approved.freelancer", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id) if User.find(transaction.user_id).payment_approved == true
    MyMailer.payment_approved_notify_client(transaction).deliver_later if User.find(transaction.job.user_id).payment_approved_email == true
    MyMailer.payment_approved_notify_freelancer(transaction).deliver_later if User.find(transaction.user_id).payment_approved_email == true
  end
end
