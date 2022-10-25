class ShipEscrowCallback
  attr_accessor :transaction
  def initialize(transaction)
    self.transaction = transaction
  end
  def commit!
  	transaction.update(state: 'ship', approval_status: 'pending' )
  	Notification.create(action: "notifications.job.milestone.escrow.ship.freelancer", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.user_id, user_id: transaction.user_id) if User.find(transaction.user_id).milestone_delivered == true
    Notification.create(action: "notifications.job.milestone.escrow.ship.client", notifiable_type: "Job", notifiable_id: transaction.job_id, recipient_id: transaction.job.user_id, user_id: transaction.user_id) if User.find(transaction.job.user_id).milestone_delivered == true
    MyMailer.milestone_shipped_by_freelancer_notify_client(transaction).deliver_later if User.find(transaction.job.user_id).milestone_delivered_email == true
    MyMailer.milestone_shipped_by_freelancer_notify_freelancer(transaction).deliver_later if User.find(transaction.user_id).milestone_delivered_email == true
  end
end