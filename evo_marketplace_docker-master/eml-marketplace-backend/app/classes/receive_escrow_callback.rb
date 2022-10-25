class ReceiveEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: "receive")
  	Notification.create(action: "notifications.job.milestone.escrow.receive.freelancer", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id) if User.find(transaction.user_id).milestone_received == true
    Notification.create(action: "notifications.job.milestone.escrow.receive.client", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id) if User.find(transaction.job.user_id).milestone_received == true
    MyMailer.milestone_received_by_client_notify_client(transaction).deliver_later if User.find(transaction.job.user_id).milestone_received_email == true
    MyMailer.milestone_received_by_client_notify_freelancer(transaction).deliver_later if User.find(transaction.user_id).milestone_received_email == true
  end
end
